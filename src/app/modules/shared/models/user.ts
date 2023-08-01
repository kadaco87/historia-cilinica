export interface User {
  fullName: FullName;
  documentType: string;
  identification: string;
  birthday: number;
  gender: string;
  contactInfo: ContactInfo;
  role: string;
  deleted?: boolean;
  fotoPerfil?: string;
}

export interface FullName {
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
}

export interface ContactInfo {
  countryOfResidence: string;
  zipCode: string;
  phone: number;
  address: string;
  state: string;
  city: string;
  email: string;
}
