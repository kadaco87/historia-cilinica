export interface User {
  fullName: FullName;
  documentType: number;
  identification: string;
  birthday: Date;
  gender: number;
  contactInfo: ContactInfo;
  role: number;
}

export interface FullName {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
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
