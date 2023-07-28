import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";
import {User} from "../models/user";

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

  getUsers(){
    // TODO: Tipar body
    return this.http.get<User[]>(this.url,  {context: checkToken()})
  }

  getOneUser(id: string) {
    return this.http.get<User>(`${this.url}/${id}`, {context: checkToken()});
  }
}
