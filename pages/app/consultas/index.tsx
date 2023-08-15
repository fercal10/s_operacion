import FormConsulta from '@components/FormConsulta'
import InputC from '@components/InputC'
import Layout from '@components/Layout'
import Londing from '@components/Londing'
import Modal from '@components/Modal'
import SideBar from '@components/SideBar'
import TablaPacientes from '@components/TablaConsultas'
import TextAreaI from '@components/TextAreaI'
import { verifyAuthApi } from '@lib/authpirsma'
import prisma from '@lib/prisma'
import { GetServerSideProps } from 'next'
import React, { FormEvent, useState } from 'react'
import useSWR from 'swr'


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const verifiedToken = await verifyAuthApi(req).catch((err) => {
    console.error(err.message)
  })


  return {
    props: { id: verifiedToken?.jti },

  };
};

type Props = {

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

const Consultas: React.FC<Props> = ({ id }: Props) => {
  const { data: consultas, isValidating, error, mutate } = useSWR("/api/consulta", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  console.log("Hey", id)
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState(initForm);
  const handlerChagen = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const consulta = {
      ...form,
      fecha: new Date(),
      // responsableId: id,


    }

    const res = fetch("/api/consulta", {
      method: "POST", headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consulta)
    });
    setOpen(false)
    setForm(initForm);

  }

  return (
    <Layout>

      <div className="overflow-hidden bg-cyan-50 overflow-x-auto border border-gray-100 rounded  shadow-2xl">

        <div className="m-2 flex flex-row items-center justify-between ">
          <button
            onClick={() => mutate()}
            className=" w-4/12  lg:w-1/6 rounded-md bg-black bg-opacity-20  px-1 md:px-3  py-2 mt-2  font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Actualizar
          </button>
          <input
            className="w-6/12  lg:w-4/6 py-2 mt-2 mx-3 text-center text-gray-700 bg-white border font-semibold border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder=" Filtro"
          />

          <button
            onClick={() => setOpen(true)}
            className=" w-4/12 lg:w-1/6 rounded-md bg-black bg-opacity-20  px-1 md:px-3  py-2 mt-2  font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Agregar
          </button>
        </div>
        {consultas ? <TablaPacientes consulta={consultas} act={mutate} /> : <Londing />}

      </div>

      <Modal title='Consulta ' open={open}>
        <FormConsulta setOpen={setOpen} id={id} />
      </Modal>
    </Layout>
  )
}

export default Consultas