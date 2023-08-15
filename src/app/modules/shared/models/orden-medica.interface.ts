export interface OrdenMedicaInterface {
  id?: string
  tipoAtencion: string;
  planManejo: string;
  medicamentos: MedicamentoInteface[];
  date: 1691121877013;
}

export interface MedicamentoInteface {
  categoriaMedicamento: string;
  medicamento: string;
  viaAdmon: string;
  dosis: number;
  presentacion: string;
  frecuencia: number;
  horario: string;
  duracion: number;
  tiempo: string;
}
