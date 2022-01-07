import { SupplierHomePageComponent } from './supplier-home-page/supplier-home-page.component';
import { SupplierAuthGuard } from './authService/supplierauthguard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AdminMenuListPageComponent } from './admin-menu-list-page/admin-menu-list-page.component';
import { AdminTrackingPageComponent } from './admin-tracking-page/admin-tracking-page.component';
import { SupplierProductPageComponent } from './supplier-product-page/supplier-product-page.component';
import { SupplierProfilePageComponent } from './supplier-profile-page/supplier-profile-page.component';
import { SupplierOrderPageComponent } from './supplier-order-page/supplier-order-page.component';
import { SupplierTrackingPageComponent } from './supplier-tracking-page/supplier-tracking-page.component';
import { StudentProfilePageComponent } from './student-profile-page/student-profile-page.component';
import { StudentCartPageComponent } from './student-cart-page/student-cart-page.component';
import { AdminViewHistoryDetailPageComponent } from './admin-view-history-detail-page/admin-view-history-detail-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgotpassword', component: ForgotpasswordPageComponent},
  { path: 'adminpage', component: AdminHomePageComponent, canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminmanageinv',component: AdminManageInventoryComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'adminprofile',component:AdminProfilePageComponent,canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminviewhistory/:id',component:AdminPurChaseHistoryPageComponent,canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminviewhistorydetail/:category/:id',component:AdminViewHistoryDetailPageComponent,canActivate: [AuthGuard,AdminAuthGuard] },
  {path:'adminaddorder',component:AdminAddOrderPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'admincartpage',component:AdminCartPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'admincheckoutpage',component:AdminCheckOutPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'adminpermissionpage',component:AdminPermissionPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'adminmenupage',component:AdminMenuListPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'admintrackingpage',component:AdminTrackingPageComponent,canActivate: [AuthGuard,AdminAuthGuard]},
  {path:'studentpage',component: StudentHomePageComponent, canActivate: [AuthGuard,StudentAuthGuard]},
  {path:'studentprofilepage',component: StudentProfilePageComponent,canActivate: [AuthGuard,StudentAuthGuard]},
  {path:'studentcartpage',component: StudentCartPageComponent,canActivate: [AuthGuard,StudentAuthGuard]},
  {path:'supplierpage',component: SupplierHomePageComponent, canActivate: [AuthGuard,SupplierAuthGuard]},
  {path:'supplierproduct',component: SupplierProductPageComponent,canActivate: [AuthGuard,SupplierAuthGuard]},
  {path:'supplierprofile',component: SupplierProfilePageComponent,canActivate: [AuthGuard,SupplierAuthGuard]},
  {path:'supplierorder',component: SupplierOrderPageComponent,canActivate: [AuthGuard,SupplierAuthGuard]},
  {path:'suppliertracking',component: SupplierTrackingPageComponent,canActivate: [AuthGuard,SupplierAuthGuard]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
