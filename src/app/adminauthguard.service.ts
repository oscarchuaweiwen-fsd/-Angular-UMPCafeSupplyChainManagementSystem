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
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  admin$: Observable<any> | undefined;
  admin:string | undefined;
  uid: string | undefined;
  constructor(
    private auth: AuthService,
    private router: Router,
    private fauth: AngularFireAuth,
    private fs:AngularFirestore
  ) {
    this.fauth.authState.subscribe(res=>{
      this.uid = res?.uid;
      console.log(this.uid);
      this.admin$ = this.fs.collection('Admin').doc(this.uid).valueChanges();
    this.admin$.subscribe((res=>{
      console.log(res.isAdmin);
      this.admin = res?.isAdmin;
      
    }))
    })
    
    
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAdmin = await this.auth.getAdminStatus();
    console.log(isAdmin)
    if(isAdmin== false) {
      this.router.navigateByUrl('');
      console.log("hello")
      return false;
    }else{
  
      return true;
      
    }
  }
}
