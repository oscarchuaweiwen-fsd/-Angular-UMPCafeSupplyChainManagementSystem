import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentAuthGuard implements CanActivate {
  student$: Observable<any> | undefined;

  constructor(
    private auth: AngularFireAuth,
    private as: AuthService,
    private fs: AngularFirestore,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isStudent = await this.as.getStudentStatus();

    console.log(isStudent);
    if (isStudent == false) {
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
      this.router.navigateByUrl;
    }
  }
}
