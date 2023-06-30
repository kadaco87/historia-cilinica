import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(CookieService)
    .check('access_token') ? true : createUrlTreeFromSnapshot(next, ['/', 'auth'])
};
