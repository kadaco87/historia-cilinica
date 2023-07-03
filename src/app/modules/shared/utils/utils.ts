import {SweetAlertOptions} from "sweetalert2";

export const  DOCUMENT_TYPES = [
  {documentType: 1, text: 'Cedula de ciudadania'},
  {documentType: 2, text: 'Cedula de Extranjeria'},
  {documentType: 3, text: 'Pasaporte'},
  {documentType: 4, text: 'Tarjeta de Identidad'}
]


export const SUCCESS_ALERT:SweetAlertOptions = {
  confirmButtonColor: '#03b2ce76'
}

export const DANGER_ALERT:SweetAlertOptions = {
  // confirmButtonColor: '#ff0011'
  confirmButtonColor: '#ff0011'
}
export const OPTIONS_SWEET_ALERT = {
  success: SUCCESS_ALERT,
  danger: DANGER_ALERT
}
