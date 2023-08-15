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


            < DetallePaciente paciente={paciente} />

        </Layout >
    )
}

export default Usuario

