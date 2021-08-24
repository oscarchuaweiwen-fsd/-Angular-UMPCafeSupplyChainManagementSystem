import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router, private fauth: AngularFireAuth,) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.fauth.authState.pipe(
      map(user=>{

        console.log(user)
        
        if(user){ return true}
        
        this.router.navigate([''],{queryParams:{returnUrl:state.url}});
        return false;
      })
    )

  }
}
