import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";
import {UserInterface} from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.apiUrl + '/users'

  constructor(private readonly http: HttpClient) {
  }

  createUserOrPatient(body: any) {
    // TODO: Tipar body
    return this.http.post<boolean>(this.url, body, {context: checkToken()})
  }

  getUsers(role?: string) {
    // TODO: Tipar body
    if (role) {
      const params = new HttpParams()
        .set('role', role);
      return this.http.get<UserInterface[]>(this.url, {context: checkToken(), params})
    } else {
      return this.http.get<UserInterface[]>(this.url, {context: checkToken()})
    }

  }

  getOneUser(id: string) {
    return this.http.get<UserInterface>(`${this.url}/${id}`, {context: checkToken()});
  }
}
