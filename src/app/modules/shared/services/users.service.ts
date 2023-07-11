import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.apiUrl+'/users'

  constructor(private readonly http: HttpClient) {  }

  createUserOrPatient(body: any){
    // TODO: Tipar body
    return this.http.post(this.url, body, {context: checkToken()})
  }
}
