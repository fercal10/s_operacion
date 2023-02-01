import Layout from '@components/Layout';
import SideBar from '@components/SideBar';
import { TConsultas } from '@lib/constants';
import prisma from '@lib/prisma';
import { Console } from 'console';
import { GetServerSideProps } from 'next';
import React from 'react'


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const inde: string = params?.id?.toString() ?? "";

    const consulta = await prisma.consulta.findMany({ where: { id: parseInt(inde) }, include: { paciente: true } })

    return {
        props: { consulta: JSON.parse(JSON.stringify(consulta)) },

    };
};
type Props = {
    consulta: TConsultas
}

const Consulta = ({ consulta }: Props) => {
    console.log(consulta)
    return (
        <Layout>
            <div className='w-full h-screen grid grid-cols-6 '>
                <div className='col-span-1'>
                    <SideBar />
                </div>
                <div className=' col-span-5 bg-white'>
                    <div className="overflow-hidden bg-cyan-50 overflow-y-auto border w-full border-gray-100 rounded  shadow-2xl">

                        {/* <DetallePaciente paciente={paciente} /> */}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Consulta