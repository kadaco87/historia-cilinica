import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl= environment.apiUrl+'/auth';
  constructor(private readonly http: HttpClient) { }

  login(body: {documentType: number, identification: string, password: string}){
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`,body);
  }

  forgotPassword(body: {documentType: number, identification: string}) {
    return this.http.post<boolean>(`${this.apiUrl}/forgot-password`, body);
  }

  resetPassword(body: {password: string, token: string}) {
    return this.http.post<boolean>(`${this.apiUrl}/reset-password`, body);
  }
}
