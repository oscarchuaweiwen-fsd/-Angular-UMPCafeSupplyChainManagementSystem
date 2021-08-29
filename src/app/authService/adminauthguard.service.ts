import { AngularFirestore } from '@angular/fire/firestore';
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
import { AuthService } from '../authService/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private fauth: AngularFireAuth,
    private fs: AngularFirestore
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAdmin = await this.auth.getAdminStatus();
  
    if (isAdmin == false) {
      this.router.navigateByUrl('');

      return false;
    } else {
      return true;
    }
  }
  
}
