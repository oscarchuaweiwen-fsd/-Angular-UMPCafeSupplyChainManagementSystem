import { map, switchAll, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  admin$: Observable<any> | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fauth: AngularFireAuth
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAdmin = await this.auth.getAdminStatus();
    localStorage.setItem('admin', isAdmin);
    if (localStorage.getItem('admin')) {
      return true;
    } else {
      return false;
    }
  }
}
