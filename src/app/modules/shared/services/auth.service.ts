import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + '/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {
  }

  login(body: { documentType: number, identification: string, password: string }) {
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  forgotPassword(body: { documentType: number, identification: string }) {
    return this.http.post<boolean>(`${this.apiUrl}/forgot-password`, body);
  }

  resetPassword(body: { password: string, token: string }) {
    return this.http.post<boolean>(`${this.apiUrl}/reset-password`, body);
  }

  refreshToken() {
    const refresh_token = this.tokenService.getRefreshToken()
    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${refresh_token}`);
    return this.http.get<{
      access_token: string,
      refresh_token: string
    }>(`${this.apiUrl}/refresh-token`, {headers})
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  // new
  // apiUrl = environment.API_URL;
  // user$ = new BehaviorSubject<User | null>(null);
  // constructor(
  //   private http: HttpClient,
  //   private tokenService: TokenService
  // ) { }
  // getDataUser() {
  //   return this.user$.getValue();
  // }

  // refreshToken(refreshToken: string) {
  //   return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`, {refreshToken})
  //     .pipe(
  //       tap(response => {
  //         this.tokenService.saveToken(response.access_token);
  //         this.tokenService.saveRefreshToken(response.refresh_token);
  //       })
  //     );;
  // }
  // register(name: string, email: string, password: string) {
  //   return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
  //     name,
  //     email,
  //     password
  //   });
  // }
  // registerAndLogin(name: string, email: string, password: string) {
  //   return this.register(name, email, password)
  //     .pipe(
  //       switchMap(() => this.login(email, password))
  //     );
  // }
  // isAvailable(email: string) {
  //   return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, {email});
  // }
  // recovery(email: string) {
  //   return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, { email });
  // }
  // changePassword(token: string, newPassword: string) {
  //   return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, { token, newPassword });
  // }
  // getProfile() {
  //   return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, { context: checkToken() })
  //     .pipe(
  //       tap(user => {
  //         this.user$.next(user);
  //       })
  //     );
  // }
  // logout() {
  //   this.tokenService.removeToken();
  // }
}
