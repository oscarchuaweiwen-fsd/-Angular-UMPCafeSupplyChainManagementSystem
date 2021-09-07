import { SupplierHomePageComponent } from './supplier-home-page/supplier-home-page.component';
import { SupplierAuthGuard } from './authService/supplierauthguard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { component } from 'vue/types/umd';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminManageInventoryComponent } from './admin-manage-inventory/admin-manage-inventory.component';
import { AdminAuthGuard } from './authService/adminauthguard.service';

import { AuthGuard } from './authService/auth-guard.service';
import { StudentAuthGuard } from './authService/studentauthguard.service';
import { ForgotpasswordPageComponent } from './forgotpassword-page/forgotpassword-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { AdminProfilePageComponent } from './admin-profile-page/admin-profile-page.component';
import { AdminPurChaseHistoryPageComponent } from './admin-pur-chase-history-page/admin-pur-chase-history-page.component';
import { AdminAddOrderPageComponent } from './admin-add-order-page/admin-add-order-page.component';
import { AdminCartPageComponent } from './admin-cart-page/admin-cart-page.component';
import { AdminCheckOutPageComponent } from './admin-check-out-page/admin-check-out-page.component';
import { AdminPermissionPageComponent } from './admin-permission-page/admin-permission-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgotpassword', component: ForgotpasswordPageComponent},
  { path: 'adminpage', component: AdminHomePageComponent, canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminmanageinv',component: AdminManageInventoryComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'studentpage',component: StudentHomePageComponent, canActivate: [AuthGuard,StudentAuthGuard]},
  {path:'supplierpage',component: SupplierHomePageComponent, canActivate: [AuthGuard,SupplierAuthGuard]},
  {path:'adminprofile',component:AdminProfilePageComponent,canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminviewhistory/:id',component:AdminPurChaseHistoryPageComponent,canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminaddorder',component:AdminAddOrderPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'admincartpage',component:AdminCartPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'admincheckoutpage',component:AdminCheckOutPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'adminpermissionpage',component:AdminPermissionPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
