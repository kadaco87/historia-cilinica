export interface NotaEnfermeriaInterface {
  id?: string;
  patientId: string;
  date:number;
  nota: string;
  temporalidad: number;
  notasAclaratorias: NotaAclaratoriaInterface[]
}

export interface NotaAclaratoriaInterface {
  id?: string;
  date: number;
  notaAclaratoria: string;
}
