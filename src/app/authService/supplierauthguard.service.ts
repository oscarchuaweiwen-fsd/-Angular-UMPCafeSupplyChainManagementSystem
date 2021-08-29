import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierAuthGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router,

  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isSupplier = await this.auth.getAdminStatus();
    console.log(isSupplier);
    if (isSupplier == false) {
      this.router.navigateByUrl('');
      return false;
    } else {
      return true;
    }
  }
}
