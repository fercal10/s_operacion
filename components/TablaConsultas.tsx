import { TPaciente } from '@lib/constants'
import Link from 'next/link'
import React from 'react'
import { KeyedMutator } from 'swr'

type Props = {
    consulta: any[],
    act: KeyedMutator<TPaciente[]>
}

const TablaPacientes = ({ consulta, act }: Props) => {
    const haceDias = (fecha: string | Date) => {
        const ahora = Date.now();
        const nacimiento = new Date(fecha).getTime()
        let edad = Math.round(Math.abs((nacimiento - ahora) / (1000 * 60 * 60 * 24)));
        return edad;
    }

    async function eliminarPaciente(id: string) {
        const res = await fetch("/api/consulta", {
            method: "DELETE", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        console.log(res);

        act();

    }
    return (
        <table className=" h-full w-full text-sm divide-y divide-gray-200">
            <thead>
                <tr className=" bg-blue-100 ">

                    <th className="pl-3  py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                        Nombre del Paciente
                    </th>
                    <th className="pl-3  py-2 font-medium text-left text-gray-900 whitespace-nowrap ">
                        Motivo Consulta
                    </th>
                    <th className="hidden md:table-cell   pl-3  py-2  font-medium text-left text-gray-900 whitespace-nowrap">
                        Tiempo de la consulta
                    </th>
                    <th className=" hidden md:table-cell  pl-3  py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                        Responsable
                    </th>
                    <th className="pl-3  py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                        Acciones
                    </th>

                </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
                {consulta ? (
                    consulta.map((fila, idx) => {
                        return (
                            <tr key={idx} className="w-full " >
                                <Link href={`/app/consultas/${fila.id}`}>

                                    <td className="pl-3 hover:text-emerald-900 hover:font-bold  py-2 font-medium text-gray-900 whitespace-nowrap">
                                        {fila.paciente.name}
                                    </td>
                                </Link>

                                <td className="pl-3  py-2 font-medium text-red-900 overflow-hidden text-clip">
                                    {fila.title}
                                </td>
                                <td className="hidden md:table-cell  pl-3  py-2 font-medium text-gray-900 whitespace-nowrap">
                                    Hace {haceDias(fila.fecha)}  Dias
                                </td>
                                <td className="hidden md:table-cell  pl-3  py-2 font-medium text-gray-900 whitespace-nowrap">
                                    {fila.responsable.usuario}
                                </td>
                                <td className="pl-3 align-middle py-2 font-medium  whitespace-nowrap flex flex-row  text-black ">

                                    <Link href={`/app/consultas/${fila.id}`}>
                                        <div className='hover:text-emerald-900  font-extrabold'>

                                            <svg height="24" viewBox="0 0 21 21" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 5)"><path d="m8.5 11c3.1296136 0 5.9629469-1.83333333 8.5-5.5-2.5370531-3.66666667-5.3703864-5.5-8.5-5.5-3.12961358 0-5.96294692 1.83333333-8.5 5.5 2.53705308 3.66666667 5.37038642 5.5 8.5 5.5z" /><path d="m8.5 2c.18463928 0 .36593924.01429736.54285316.04184538-.02850842.148891-.04285316.30184762-.04285316.45815462 0 1.38071187 1.1192881 2.5 2.5 2.5.156307 0 .3092636-.01434474.4576252-.04178957.0280774.17585033.0423748.35715029.0423748.54178957 0 1.93299662-1.5670034 3.5-3.5 3.5-1.93299662 0-3.5-1.56700338-3.5-3.5s1.56700338-3.5 3.5-3.5z" /></g></svg>
                                        </div>
                                    </Link>

                                    <button onClick={() => eliminarPaciente(fila.id)}>
                                        <div className='hover:text-emerald-900'>
                                            <svg height="24" viewBox="0 0 21 21" width="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 2)"><path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.0543618 0 1.91816512.81587779 1.99451426 1.85073766l.00548574.14926234h-4c0-1.1045695.8954305-2 2-2z" /><path d="m.5 2.5h14" /><path d="m5.5 5.5v8" /><path d="m9.5 5.5v8" /></g></svg>
                                        </div>
                                    </button>
                                </td>


                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td>Loding...... </td>
                    </tr>
                )}
            </tbody>
        </table >
    )
}

export default TablaPacientes