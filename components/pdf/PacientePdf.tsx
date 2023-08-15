import { TConsultas, TPaciente } from '@lib/constants'
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React, { useState } from 'react'

type Props = {
    consulta: TConsultas,
    paciente: TPaciente
}

const PacientePdf = ({ consulta, paciente }: Props) => {

    const nacimiento = new Date(paciente.fechaN);
    const hoy = new Date();



    const styles = StyleSheet.create({
        fila: { display: "flex", flexDirection: "row", },
        filatext: { display: "flex", flexDirection: "row", flexWrap: 'nowrap', borderBottom: 1, justifyContent: 'flex-start', alignItems: 'stretch', },
        encabezado: { display: "flex", flexDirection: "row", alignItems: 'stretch', justifyContent: 'space-between', width: 500, marginHorizontal: "auto", marginBottom: 28, borderBottom: 3 },
        col: { display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: 'stretch' },
        page: { padding: 10, paddingTop: 20, display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'baseline', marginHorizontal: "auto" },
        texto: { color: 'black', fontSize: 13, textAlign: 'center', padding: 3, paddingVertical: 8 },
        textoPeque: { color: 'black', fontSize: 11, textAlign: 'left', padding: 3, paddingVertical: 8 },
        textocasilla: { color: 'black', fontSize: 13, textAlign: 'center', borderRight: 1, padding: 3, paddingVertical: 8 }
    });
    return (
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={styles.encabezado}>
                    <Image src='/favicon.ico' fixed style={{ width: "80px", height: "70px", margin: 5 }} />
                    <View style={{ border: 1, borderColor: 'black', display: "flex", flexDirection: "row", justifyContent: 'space-around', alignItems: 'stretch' }} >

                        <View style={styles.col}>

                            <Text style={styles.texto}>Nombre de la compañia y rif </Text>
                            <Text style={styles.texto}>Nombre de la compañia y rif </Text>
                        </View>
                        <View style={styles.col}>

                            <Text style={styles.texto}>Nombre de la compañia y rif </Text>
                            <Text style={styles.texto}>Fecha: {(hoy.getDate()) + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear()} </Text>
                        </View>

                    </View >
                </View>

                <View style={{ marginHorizontal: 'auto' }}>
                    <Text>Historia clínica Atención   Domiciliaria</Text>
                </View>
                <View style={{ display: "flex", width: 500, flexDirection: "column", justifyContent: 'space-around', alignItems: 'stretch', marginHorizontal: "auto", border: 2, marginVertical: 10 }}>


                    <View style={styles.filatext}>
                        <Text style={styles.textocasilla}>Nombre: {paciente.name}</Text>
                        <Text style={styles.texto}>Cedula: {paciente.cedula}</Text>
                    </View>
                    <View style={styles.filatext}>

                        <Text style={styles.textocasilla}>Edad: 20</Text>
                        <Text style={styles.textocasilla}>Fecha de Nacimiento: {(nacimiento.getDate() + 1) + "/" + (nacimiento.getMonth() + 1) + "/" + nacimiento.getFullYear()}</Text>
                        <Text style={styles.texto}>Telefono de Contacto: {paciente.telefono}</Text>
                    </View>

                    <View style={styles.filatext}>
                        <Text style={styles.texto}>Direcion : {paciente.dirrecion}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", flexWrap: 'nowrap', justifyContent: 'flex-start', alignContent: 'stretch' }}>
                        <Text style={styles.texto}>Familiar: {paciente.familiar}</Text>
                    </View>



                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={{ fontSize: 13, textAlign: 'left', padding: 3, paddingVertical: 8 }}>MOTIVO DE CONSULTA:  {consulta.title}</Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}>Enfermedad Actual : {consulta.enfermedadAct}</Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Antecedentes personales de relevancia:  {consulta.antecedente} </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Examen físico: {consulta.examenfisico}
                    </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Diagnostico:  {consulta.diagnostico}  </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> MEDICAMENTOS ADMINISTRADOS :{consulta.medicamentoAd} </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> TRATAMIENTO INDICADO:
                        {consulta.tratamientoMand}
                    </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> COMENTARIO: {consulta.comentarios}
                    </Text>
                </View>
            </Page>
        </Document >
    )
}

export default PacientePdf