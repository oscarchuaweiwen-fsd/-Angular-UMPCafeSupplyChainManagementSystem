import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { component } from 'vue/types/umd';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminAuthGuard } from './adminauthguard.service';

import { AuthGuard } from './auth-guard.service';
import { ForgotpasswordPageComponent } from './forgotpassword-page/forgotpassword-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgotpassword', component: ForgotpasswordPageComponent},
  { path: 'adminpage', component: AdminHomePageComponent, canActivate: [AuthGuard,AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
