export const USER_TOKEN = "token";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export type TPaciente = {
  id: string;
  name: string;
  cedula: string;
  genero: string;
  fechaN: string | Date;
  telefono: string;
  dirrecion: string;
  familiar: string;
  consultas?: Array<TConsultas>;
  archivos: Array<string>;
};

export type TConsultas = {
  id: Number;
  title: string;
  enfermedadAct?: string;
  examenfisico: string;
  antecedente?: string;
  diagnostico: string;
  fecha: Date;
  responsable: Responsable;
  medicamentoAd?: string;
  tratamientoMand?: string;
  comentarios?: string;
  modalidad: string;
  cobro: string;
  paciente: TPaciente;
};

type Responsable = {
  usuario: string;
};
