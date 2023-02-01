import { TPaciente } from '@lib/constants'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import PacientePdf from './pdf/PacientePdf'

type Props = {
    paciente: TPaciente
}

const DetallePaciente = ({ paciente }: Props) => {
    const nacimiento = new Date(paciente.fechaN)
    const edad = Math.floor((Date.now() - nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365))
    const [pdf, setPdf] = useState<Boolean>(true)


    return (
        <div className='w-full h-full flex  flex-col '>
            <div className='w-full '>
                <button onClick={() => setPdf(true)} className='mx-11 px-8 py-3 rounded-xl bg-emerald-500'>
                    <PDFDownloadLink document={<PacientePdf paciente={paciente} />} fileName={`${paciente.name}.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Cargando' : 'Descargar PDF'
                        }
                    </PDFDownloadLink></button>
            </div>
            {pdf ? <div>
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
                <div className='flex   bg-emerald-100 '>
                    {paciente.consultas ? paciente.consultas.map((item, idx) =>
                        <div className='flex justify-between p-6 text-2xl font-semibold w-full' key={idx}>
                            <div>
                                <h6 >{item.title}</h6>
                                <h6 className='text-sm text-gray-700' > En el {item.modalidad}</h6>
                            </div>
                            <h6 >{item.cobro} $</h6>

                        </div>
                    ) : null}
                </div>
            </div> :

                < PDFViewer style={{ height: '100vh', width: "100%", display: 'flex' }}>
                    <PacientePdf paciente={paciente} />
                </PDFViewer >
            }

        </div>
    )
}

export default DetallePaciente

