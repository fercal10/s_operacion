import { TPaciente } from '@lib/constants'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import useSWR from 'swr'
import InputC from './InputC'
import TextAreaI from './TextAreaI'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>,
    id: string

}
const initForm = {
    title: '',
    enfermedadAct: '',
    antecedente: "",
    examenfisico: '',
    diagnostico: '',
    fecha: '',
    medicamentoAd: "",
    tratamientoMand: "",
    comentarios: "",
    modalidad: "consultorio",
    cobro: "30",
    pacienteId: ""

}

const FormConsulta = ({ setOpen, id }: Props) => {
    const [form, setForm] = useState(initForm);
    const { data: pacientes, isValidating, error, mutate } = useSWR<TPaciente[]>("/api/pacientes", {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const handlerChagen = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const consulta = {
            ...form,
            fecha: new Date(),
            responsableId: id,
        }

        const res = fetch("/api/consulta", {
            method: "POST", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consulta)
        });
        setOpen(false)
        setForm(initForm);

    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='max-h-max w-full sm:grid grid-cols-1 gap-x-5 gap-y-3'>
                <select
                    value={form.pacienteId}
                    onChange={(e) => { setForm({ ...form, pacienteId: e.target.value }) }}
                    className='col-span-1 w-full rounded-lg p-3 col-span-2  bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200  focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-30'>
                    <option></option>
                    {pacientes ? pacientes.map((item, idx) => <option key={idx} value={item.id} >{item.name}</option>) : ""}
                </select>
                <div className='col-span-1'>

                    <InputC handlerChagen={handlerChagen} valor={form.title} title="Motivo de la Consulta" name='title' placeholder='' />
                </div>
                <TextAreaI handlerChagen={handlerChagen} valor={form.antecedente} title="Antecedentes " name='antecedente' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.enfermedadAct} title="Enfermedad Actual" name='enfermedadAct' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.examenfisico} title="Examen Fisico" name='examenfisico' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.diagnostico} title="Diagnostico" name='diagnostico' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.medicamentoAd} title="Medicamentos Administrado" name='medicamentoAd' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.tratamientoMand} title="Tratamiento Mandado " name='tratamientoMand' />
                <TextAreaI handlerChagen={handlerChagen} valor={form.comentarios} title="Comentarios" name='comentarios' />

                <div className=" w-full  col-span-1  mt-2 " >
                    <div className="flex justify-between mb-2">
                        <label htmlFor="modalidad" className="text-base font-semibold  text-clip text-start text-neutral-800 ">
                            Modalidad
                        </label>
                    </div>

                    <select value={form.modalidad}
                        onChange={(e) => { setForm({ ...form, modalidad: e.target.value }) }}
                        className=' w-full rounded-lg p-3  bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200  focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-30'>
                        <option value="consultorio " >Consultorio </option>
                        <option value='a Domicilio'>A Domicilio </option>
                    </select>
                </div>

                <InputC handlerChagen={handlerChagen} title="Cobro de la Consulta" name='cobro' valor={form.cobro} type='number' placeholder='40$' />
                <div className='col-span-2 w-full mt-5 co grid grid-cols-2 gap-x-5 gap-y-7'>

                    <button onClick={() => {
                        setOpen(false)
                        setForm(initForm);
                    }} type="button" className='col-span-1 bg-red-400 rounded-2xl py-3 px-5 text-white font-bold' >Cerrar</button>
                    <button type='submit' className='col-span-1 bg-blue-700 rounded-2xl py-3 px-5 text-white font-bold' >Registrar</button>
                </div>
            </div>
        </form>
    )
}

export default FormConsulta