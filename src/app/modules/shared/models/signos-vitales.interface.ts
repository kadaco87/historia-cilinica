export interface SignosVitalesInterface {
  id?: string;
  patientId?: string;
  date: number;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria: number;
  saturacion: number;
  sistolica: number;
  diastolica: number;
  pam: number;
  temperatura: number;
  glasgow: number;
  estatura: number;
  peso: number;
  imc: number;
  rh: string;
}

export type CrearSignosVitales = Omit<SignosVitalesInterface, 'id'|'patientId'>;
