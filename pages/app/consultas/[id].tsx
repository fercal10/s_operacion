import Layout from '@components/Layout';
import SideBar from '@components/SideBar';
import { TConsultas } from '@lib/constants';
import prisma from '@lib/prisma';
import { Console } from 'console';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react'

const DetalleConsulta = dynamic(() =>
    import('@components/DetalleConsulta'), { ssr: false }
)


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const inde: string = params?.id?.toString() ?? "";

    const consulta = await prisma.consulta.findUnique({ where: { id: parseInt(inde) }, include: { paciente: true ,responsable:true} })

    return {
        props: { consulta: JSON.parse(JSON.stringify(consulta)) },

    };
};

type Props = {
    consulta: TConsultas
}

const Consulta = ({ consulta }: Props) => {
    return (
        <Layout>
            <DetalleConsulta consulta={consulta} />

        </Layout >
    )
}

export default Consulta