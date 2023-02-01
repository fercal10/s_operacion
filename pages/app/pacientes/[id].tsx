import Layout from '@components/Layout';
import SideBar from '@components/SideBar';
import { TPaciente } from '@lib/constants';
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { PDFViewer } from '@react-pdf/renderer';
import PacientePdf from '@components/pdf/PacientePdf';

const DetallePaciente = dynamic(() =>
    import('@components/DetallePaciente'), { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {


    const paciente = await prisma.paciente.findUnique({ where: { id: params?.id?.toString() }, include: { consultas: true } })

    return {
        props: { paciente: JSON.parse(JSON.stringify(paciente)) },

    };
};


type Props = {
    paciente: TPaciente,

}

const Usuario: React.FC<Props> = ({ paciente }) => {

    return (
        <Layout>

            < div className='flex flex-auto text-xs md:text-base  flex-col sm:flex-row ' >
                <div className='flex min-h-min'>
                    <SideBar />
                </div>
                <div className=' flex-auto bg-white'>

                    <div className=" bg-cyan-50 overflow-x-auto border border-gray-100 rounded  shadow-2xl">


                        < DetallePaciente paciente={paciente} />

                    </div>
                </div>


            </div >
        </Layout >
    )
}

export default Usuario

