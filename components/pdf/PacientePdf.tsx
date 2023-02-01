import { TPaciente } from '@lib/constants'
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React, { useState } from 'react'

type Props = {
    paciente: TPaciente
}

const PacientePdf = ({ paciente }: Props) => {

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
                    <Image src='/Logo-Dr.Plus.png' fixed style={{ width: "80px", height: "70px", margin: 5 }} />
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
                    <Text style={{ fontSize: 13, textAlign: 'left', padding: 3, paddingVertical: 8 }}>MOTIVO DE CONSULTA:   dolor al orinar</Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}>Enfermedad Actual. Paciente femenina, natural y procedente de la localidad, con antecedentes conocidos de hipertensión arterial, quien refiere inicio de enfermedad actual, hace  7 días aproximadamente cuando comienza a presentar, disuria, hematuria, motivo por el cual se solicita urocultivo donde se aísla germen y se decid.</Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Antecedentes personales de relevancia:   NO alérgico, PATOLOGIAS DE BASE; Hipertensión Arterial ESQUEMA DE INMUNIZACION COMPLETO PARA SARS- COV2, </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Examen físico. FC:    80    FR:   20         T/A:  120/70      SPO%:        99%                           Temp: 37”
                        PIEL BLANCA NORMOCOLOREADA, TURGOR Y ELASCTICIDAD ACORDE A LA EDAD, LLENADO CAPILAR 3 SEG.
                        C/P TORAX SIMETRICO. NORMOEXPANSIBLE, NORMO ELASTICO, RUIDOS RESPIRATORIOS PRESENTES NO SE AUSCULTAN AGREADOS. RUIDOS CARDIACOS RITMICOS NORMOFONETICOS SIN SOPLO.
                        ABDOMEN PLANO RUIDOS HIDROAEREOS PRESENTES, BLANDO DEPRIMIBLE NO DOLOROSO, NO VISCEROMEGALIA.  Puntos pieloureterales no dolorosos
                        RESTO DEL EXAMEN SIN ALTERACIONES.
                    </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> Diagnostico:  Infección del tracto urinario germen aislado E. coli  </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> MEDICAMENTOS ADMINISTRADOS EN CASA: </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> TRATAMIENTO INDICADO:
                        Longacef 400 mg
                        Macrodantina 100mg
                        Genurin 200mg
                        Bargonil 2%
                    </Text>
                </View>
                <View style={{ border: 1, width: 500, marginHorizontal: 'auto', marginVertical: 10, }}>
                    <Text style={styles.textoPeque}> COMENTARIO:  SE SOLICITARON LABORATORIOS CONTROL
                    </Text>
                </View>
            </Page>
        </Document >
    )
}

export default PacientePdf