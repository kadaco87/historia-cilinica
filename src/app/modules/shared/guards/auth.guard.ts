import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(TokenService)
    .isValidToken() ? true :(
    inject(TokenService).isValidRefreshToken() ?
      inject(AuthService).refreshToken() :
      createUrlTreeFromSnapshot(next, ['/', 'auth']))
};
