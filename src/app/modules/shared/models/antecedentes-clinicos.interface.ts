
export interface tiposTixicologicosInterface {
  tabaquismo: boolean;
  alcoholismo: boolean;
  otros: boolean;
}
export interface ToxicologicosInterface {
  tipo: tiposTixicologicosInterface;
  observaciones: string;
}

export interface TiposPatologicosInterface {
  hipertensionArterial: boolean;
  diabetesMellitus: boolean;
  hepatitisB: boolean;
  hepatitisC: boolean;
  vih: boolean;
  serologia: boolean;
  epoc: boolean;
  enfermedadCoronaria: boolean;
  dislipidemia: boolean;
  cancer:boolean;
}
export interface PatologicosInterface {
  tipo: TiposPatologicosInterface;
  observaciones: string;
}

export interface TiposQuirurgicosInterface {
  nefrectomia: boolean;
  cirugiaAbdominal: boolean;
  apendicectomia: boolean;
  herniorrafia: boolean;
  laparotomia: boolean;
  histeroctomia: boolean;
  osteosintesis: boolean;
}

export interface QuirurgicosInterface {
  tipo: TiposQuirurgicosInterface;
  observaciones: string;
}

export interface TiposAlergicosInterface {
  penicilinas: boolean;
  sulfas: boolean;
  dipirona: boolean;
  iecas: boolean;
}

export interface AlergicosInterface {
  tipo: TiposAlergicosInterface;
  observaciones: string;
}

export interface FamiliaresInterface {
  parentesco: string;
  fechaDiagnostico: number;
  diagnostico: string;
}

export interface AntecedentesClinicosInterface {
  historyId: string;
  patientId: string;
  toxicologico: ToxicologicosInterface;
  patologico: PatologicosInterface;
  quirurgicos: QuirurgicosInterface;
  alergicos: AlergicosInterface;
  familiares: FamiliaresInterface[]
}
