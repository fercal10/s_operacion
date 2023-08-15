import FormPaciente from '@components/FormPaciente';
import Layout from '@components/Layout'
import Londing from '@components/Londing';
import Modal from '@components/Modal';
import SideBar from '@components/SideBar'
import SubirFile from '@components/SubirFile';
import TablaPacientes from '@components/TablaPacientes';
import { verifyAuthApi } from '@lib/authpirsma';
import { TPaciente } from '@lib/constants';
import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import useSWR from 'swr'


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const verifiedToken = await verifyAuthApi(req).catch((err) => {
    console.error(err.message)
  })

  const user = await prisma.user.findUnique({ where: { id: verifiedToken?.jti } })
  const id = { name: user?.usuario, rol: user?.isAdmin }

  return {
    props: { id: id },

  };
};

type Props = {
  feed: any[]
  id: string
}

const Info: React.FC<Props> = ({ id }) => {
  console.log(id);
  const { data: pacientes, isValidating, error, mutate } = useSWR<TPaciente[]>("/api/pacientes", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const [filtro, setFiltro] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [archivo, setArchivo] = useState<boolean>(false);
  // console.log(pacientes)
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
            onChange={(e) => setFiltro(e.target.value)}
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

        {pacientes ? <TablaPacientes act={mutate} paciente={pacientes.filter(({ cedula }) => cedula.includes(filtro))} /> : <Londing />}

      </div>



      <Modal title='Paciente' open={open}>
        <FormPaciente setOpen={setOpen} act={mutate} />
      </Modal>

    </Layout>
  )
}

export default Info;