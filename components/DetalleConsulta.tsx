import { TConsultas, TPaciente } from '@lib/constants'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import PacientePdf from './pdf/PacientePdf'

type Props = {
    consulta: TConsultas
}

const DetalleConsulta = ({ consulta }: Props) => {
    console.log(consulta)
    const nacimiento = new Date(consulta.paciente.fechaN)
    const edad = Math.floor((Date.now() - nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365))
    const [pdf, setPdf] = useState<Boolean>(true)


    return (
        <div className='w-full h-full flex  flex-col '>
            <div className='w-full flex justify-center '>
                <button className='w-full sm:w-1/2  px-8 py-3 sm:rounded-xl bg-emerald-500'>
                    <PDFDownloadLink document={<PacientePdf consulta={consulta} paciente={consulta.paciente} />} fileName={`${consulta.paciente.name}.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Cargando' : 'Descargar PDF'
                        }
                    </PDFDownloadLink></button>
                <button onClick={() => setPdf(!pdf)} className='hidden sm:block sm:w-1/2 text-center px-8 py-3 rounded-xl bg-emerald-500'>
                    Ver pdf
                </button>
            </div>
            {pdf ? <div>
                <div className='flex  flex-col  justify-center   text-lg  bg-slate-100  border-b-4 border-gray-500 '>
                    <div className='flex p-2 pt-6 border-b-2 border-gray-700  gap-6 bg-sky-100 '>
                        <h6 className='p4   font-semibold text-left text-gray-900 '>Nombre: {consulta.paciente.name}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Cobro: {consulta.cobro}$</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Atendido : {consulta.responsable?.usuario}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Modalida: {consulta.modalidad}</h6>
                    </div>
                    <div className=' flex p-2 border-b-2 border-gray-700  gap-6 bg-sky-100 '>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Motivo de la Consulta: {consulta.title}</h6>

                    </div>
                    <div className='flex  flex-col gap-y-3    bg-slate-100 '>
                        <h6 className='p4   font-semibold text-left text-gray-900 '>Antecedente : {consulta.antecedente} </h6>

                        <h6 className='p4 font-semibold text-left text-gray-900 '>Examen Fisico: {consulta.examenfisico}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Enfermedad Actual: {consulta.enfermedadAct}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Diagnostico: {consulta.diagnostico}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Medicamento adminisitrado: {consulta.medicamentoAd}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Receta : {consulta.tratamientoMand}</h6>
                        <h6 className='p4 font-semibold text-left text-gray-900 '>Comentarios : {consulta.comentarios}</h6>


                    </div>
                </div>
            </div> :

                < PDFViewer style={{ height: '100vh', width: "100%", display: 'flex' }}>
                    <PacientePdf consulta={consulta} paciente={consulta.paciente} />
                </PDFViewer >
            }

        </div>
    )
}

export default DetalleConsulta

