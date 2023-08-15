import { TPaciente } from '@lib/constants'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Link from 'next/link'
import React, { useState } from 'react'
import PacientePdf from './pdf/PacientePdf'

type Props = {
    paciente: TPaciente
}

const DetallePaciente = ({ paciente }: Props) => {
    const nacimiento = new Date(paciente.fechaN)
    const edad = Math.floor((Date.now() - nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365))


    return (
        <div className='w-full h-full flex  flex-col '>

            <div>
                <div className='flex  flex-col  justify-center   text-lg  bg-slate-100  border-b-4 border-gray-500 '>
                    <div className='flex p-2 pt-6 border-b-2 border-gray-700  gap-6 bg-sky-100 '>
                        <h6 className='p4   font-semibold text-left text-gray-900 '>Nombre: {paciente.name}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Cedula: {paciente.cedula}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Telefono: {paciente.telefono}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Edad: {edad}</h6>
                    </div>
                    <div className=' flex p-2 border-b-2 border-gray-700  gap-6 bg-sky-100 '>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Direccion: {paciente.dirrecion}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Familiar: {paciente.familiar}</h6>

                        <h6 className='p4 font-semibold text-left text-gray-900 '>Fecha de Nacimiento: {(nacimiento.getDate() + 1) + "/" + (nacimiento.getMonth() + 1) + "/" + nacimiento.getFullYear()}</h6>
                    </div>
                </div>
                <div className='flex  flex-col  bg-emerald-100 '>
                    {paciente.archivos ? paciente.archivos.map((fila, idx) => {
                        const a = fila.split('_');
                        const fecha = new Date(parseInt(a[0]));


                        return (<Link href={"/images/" + fila} key={idx} >
                            <div className='w-full bg-slate-100 border-2 rounded-sm text-lg pl-8 py-2' >
                                {a[1] + " " + fecha.getDate() + "/" + (fecha.getMonth() + 1) +"/"+ fecha.getFullYear()}
                            </div></Link>)
                    }) : null}
                    {paciente.consultas ? paciente.consultas.map((item, idx) =>
                        <div className='flex justify-between p-6 text-2xl font-semibold w-full' key={idx}>
                            <Link href={`/app/consultas/${item.id}`}>
                                <a>
                                    <div
                                    >
                                        <h6 >{item.title}</h6>
                                        <h6 className='text-sm text-gray-700' > En el {item.modalidad}</h6>

                                    </div>
                                </a>
                            </Link>
                            <button className='border-2 text-xs mr-3 border-black bg-sky-300 sm:p-3 w-1/5 h-16'>

                                <PDFDownloadLink document={<PacientePdf consulta={item} paciente={paciente} />} fileName={`${paciente.name}.pdf`}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Cargando' : 'Descargar PDF'
                                    }
                                </PDFDownloadLink>
                            </button>
                            <h6 >{item.cobro} $</h6>

                        </div>
                    ) : null}
                </div>
            </div>

        </div>
    )
}

export default DetallePaciente

