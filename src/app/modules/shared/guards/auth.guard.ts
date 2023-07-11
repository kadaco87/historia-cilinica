import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import {TokenService} from "../services/token.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(TokenService)
    .isValidToken() ? true : createUrlTreeFromSnapshot(next, ['/', 'auth'])
};
