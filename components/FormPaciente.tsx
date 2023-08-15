import { TPaciente } from '@lib/constants';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { KeyedMutator } from 'swr';
import InputC from './InputC'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>,
    act: KeyedMutator<TPaciente[]>
}
const initForm = {
    name: '',
    cedula: '',
    fechaN: '',
    genero: 'Mujer',
    telefono: '',
    dirrecion: '',
    familiar: '',
    consultas: [],
}

const FormPaciente = ({ setOpen, act }: Props) => {
    const [form, setForm] = useState(initForm);
    const handlerChagen = (e: React.ChangeEvent<HTMLInputElement>): void => { setForm({ ...form, [e.target.name]: e.target.value }); }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const paciente = { ...form, fechaN: new Date(form.fechaN) };
        setForm(initForm);

        const res = await fetch("/api/pacientes", {
            method: "POST", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paciente)
        });
        act();
        setOpen(false)

    }
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='max-h-max w-max sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-7'>
                <InputC handlerChagen={handlerChagen} valor={form.name} title="Nombre y Apellidao" name='name' placeholder='Fernando Calderon' />
                <div className=" w-full pt-2 " >
                    <div className="flex justify-between mb-2">
                        <label htmlFor='genero' className="text-base font-semibold  text-clip text-start text-neutral-800 ">
                            Genero
                        </label>
                    </div>
                    <select
                        onChange={(e) => { setForm({ ...form, genero: e.target.value }) }}
                        value={form.genero}
                        className='block w-full px-4 py-2 mt-2 h-12 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-30 '>
                        <option >
                            Mujer
                        </option>
                        <option>
                            Hombre
                        </option>
                        <option>
                            No binario
                        </option>
                    </select>
                </div>

                <InputC handlerChagen={handlerChagen} valor={form.cedula} title="Cedula" name='cedula' placeholder='28561235' type='number' />
                <InputC handlerChagen={handlerChagen} valor={form.fechaN} title="Fecha de Nacimiento" name='fechaN' type='Date' placeholder='' />
                <InputC handlerChagen={handlerChagen} valor={form.telefono} type="tel" title="Telefono" name='telefono' placeholder='' />
                <InputC handlerChagen={handlerChagen} valor={form.dirrecion} title="Dirrecion" name='dirrecion' placeholder='San Diego' />
                <InputC handlerChagen={handlerChagen} valor={form.familiar} title="Familiar " name='familiar' placeholder='prima Veronica' />
                <div className='w-full mt-5  sm:col-span-2 xl:col-span-3 grid grid-cols-2 gap-x-5 gap-y-7'>

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

export default FormPaciente