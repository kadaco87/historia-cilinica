import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignosVitalesInterface} from "../models/signos-vitales.interface";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";
import {NotaAclaratoriaInterface, NotaEnfermeriaInterface} from "../models/nota-enfermeria.interface";
import {OrdenMedicaInterface} from "../models/orden-medica.interface";
import {AtencionMedicaInterface} from "../models/atencion-medica.interface";

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  apiUrl = environment.apiUrl+'/clinic-history';
  constructor(private readonly http: HttpClient) { }

  registrarSignosVitales( historyId: string, patientId: string, signosVitales: SignosVitalesInterface){
    return this.http.post<boolean>(`${this.apiUrl}/vital-signs/${historyId}/${patientId}/`, signosVitales, {context: checkToken()});
  }

  obtenerSignosVitales(historyId: string){
    return this.http.get<SignosVitalesInterface[]>(`${this.apiUrl}/vital-signs/${historyId}`, {context: checkToken()});
  }
  registrarNotasEnfermeria(historyId: string,patientId: string, notaEnfermeria: NotaEnfermeriaInterface){
    return this.http.post<boolean>(`${this.apiUrl}/notas-enfermeria/${historyId}/${patientId}`, notaEnfermeria, {context: checkToken()});
  }


  obtenerNotasEnfermeria(id: string){
    return this.http.get<NotaEnfermeriaInterface[]>(`${this.apiUrl}/notas-enfermeria/${id}`, {context: checkToken()});
  }

  registrarNotasAclaratoria(path: string, idNota: string, notaEnfermeria: NotaAclaratoriaInterface){
    return this.http.post<boolean>(`${this.apiUrl}/${path}/${idNota}/notas-aclaratorias`, notaEnfermeria, {context: checkToken()});
  }

  crearOrdenMedica(historyId: string, patientId: string, ordenMedica: OrdenMedicaInterface) {
    return this.http.post(`${this.apiUrl}/ordenes-medicas/${historyId}/${patientId}`, ordenMedica, {context: checkToken()});
  }

  getOrdenesMedicasPorHistoryId(historyId: string) {
    return this.http.get<OrdenMedicaInterface[]>(`${this.apiUrl}/ordenes-medicas/${historyId}`, {context: checkToken()});
  }

  crearAtencionMedica(historyId: string,patientId:string, atencionMedica: AtencionMedicaInterface) {
    return this.http.post<boolean>(`${this.apiUrl}/atenciones-medicas/${historyId}/${patientId}`, atencionMedica, {context: checkToken()});
  }

  crearHistoriaClinica(historyId: string, id: string) {
    return this.http.post<boolean>(`${this.apiUrl}/historia-clinica/${historyId}/${id}`,{}, {context: checkToken()});
  }

  obtenerMedicamentos(historyId: string) {
    return this.http.get<boolean>(`${this.apiUrl}/medicamentos/${historyId}`,{context: checkToken()});
  }
}
