import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterPipePipe } from './register-pipe.pipe';
import { RegisterDDirective } from './register-d.directive';
import { ForgotpasswordPageComponent } from './forgotpassword-page/forgotpassword-page.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './authService/auth.service';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminAuthGuard } from './authService/adminauthguard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminManageInventoryComponent } from './admin-manage-inventory/admin-manage-inventory.component';
import { AdminnavbarpageComponent } from './adminnavbarpage/adminnavbarpage.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorserviceService } from './interceptorservice.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {AccordionModule} from 'primeng/accordion';   
import {MenuItem, MessageService} from 'primeng/api';  
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthGuard } from './authService/auth-guard.service';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { SupplierHomePageComponent } from './supplier-home-page/supplier-home-page.component';
import { SupplierAuthGuard } from './authService/supplierauthguard.service';
import { StudentAuthGuard } from './authService/studentauthguard.service';
import { AdminProfilePageComponent } from './admin-profile-page/admin-profile-page.component';
import {MatIconModule} from '@angular/material/icon';
import {PasswordModule} from 'primeng/password';
import { AdminPurChaseHistoryPageComponent } from './admin-pur-chase-history-page/admin-pur-chase-history-page.component';
import { AdminAddOrderPageComponent } from './admin-add-order-page/admin-add-order-page.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {ConnectionServiceModule} from 'ngx-connection-service';
import { AdminCartPageComponent } from './admin-cart-page/admin-cart-page.component';  
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import {MatCardModule} from '@angular/material/card';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import { AdminCheckOutPageComponent } from './admin-check-out-page/admin-check-out-page.component';
import { AdminPermissionPageComponent } from './admin-permission-page/admin-permission-page.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import { AdminMenuListPageComponent } from './admin-menu-list-page/admin-menu-list-page.component';
import { AdminAddMenuListPageComponent } from './admin-add-menu-list-page/admin-add-menu-list-page.component';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {ChipsModule} from 'primeng/chips';
import { DialogService } from 'primeng/dynamicdialog';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {RatingModule} from 'primeng/rating';
import { AdminTrackingPageComponent } from './admin-tracking-page/admin-tracking-page.component';
import {TabViewModule} from 'primeng/tabview';
import { SuppliernavbarpageComponent } from './suppliernavbarpage/suppliernavbarpage.component';
import { SupplierProductPageComponent } from './supplier-product-page/supplier-product-page.component';
import { SupplierAddProductPageComponent } from './supplier-add-product-page/supplier-add-product-page.component';
import { SupplierEditProductPageComponent } from './supplier-edit-product-page/supplier-edit-product-page.component';
import { SupplierProfilePageComponent } from './supplier-profile-page/supplier-profile-page.component';
import { SupplierOrderPageComponent } from './supplier-order-page/supplier-order-page.component';
import { SupplierTrackingPageComponent } from './supplier-tracking-page/supplier-tracking-page.component';
import {TimelineModule} from 'primeng/timeline';
import { NgChartsModule } from 'ng2-charts';
import {MatGridListModule} from '@angular/material/grid-list';
import { StudentNavbarPageComponent } from './student-navbar-page/student-navbar-page.component';
import { StudentProfilePageComponent } from './student-profile-page/student-profile-page.component';
import { StudentCartPageComponent } from './student-cart-page/student-cart-page.component';
import {MatListModule} from '@angular/material/list'
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    RegisterPipePipe,
    RegisterDDirective,
    ForgotpasswordPageComponent,
    AdminHomePageComponent,
    AdminManageInventoryComponent,
    AdminnavbarpageComponent,
    StudentHomePageComponent,
    SupplierHomePageComponent,
    AdminProfilePageComponent,
    AdminPurChaseHistoryPageComponent,
    AdminAddOrderPageComponent,
    AdminCartPageComponent,
    AdminCheckOutPageComponent,
    AdminPermissionPageComponent,
    AdminMenuListPageComponent,
    AdminAddMenuListPageComponent,
    AdminTrackingPageComponent,
    SuppliernavbarpageComponent,
    SupplierProductPageComponent,
    SupplierAddProductPageComponent,
    SupplierEditProductPageComponent,
    SupplierProfilePageComponent,
    SupplierOrderPageComponent,
    SupplierTrackingPageComponent,
    StudentNavbarPageComponent,
    StudentProfilePageComponent,
    StudentCartPageComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatPasswordStrengthModule,
    MatFormFieldModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    ConfirmDialogModule,
    AccordionModule,
    MessagesModule,
    MatIconModule,
    PasswordModule,
    NgxSkeletonLoaderModule,
    NgxMapboxGLModule.withConfig({accessToken:"pk.eyJ1Ijoib3NjYXJjaHVhd2Vpd2VuLWZzZCIsImEiOiJja3N4eXYycjgxYXp6Mm9wdTg5bTZ5eGUzIn0.uR8fYkY2kZhEjP43Cx-f6w",geocoderAccessToken:"pk.eyJ1Ijoib3NjYXJjaHVhd2Vpd2VuLWZzZCIsImEiOiJja3N4eXYycjgxYXp6Mm9wdTg5bTZ5eGUzIn0.uR8fYkY2kZhEjP43Cx-f6w"}),
    HttpClientModule,
    MatMenuModule,
    MatBadgeModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    NgxNumberSpinnerModule,
    MatCardModule,
    TableModule,
    InputNumberModule,
    DropdownModule,
    ToggleButtonModule,
    ConfirmPopupModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ChipsModule,
    CardModule,
    PanelModule,
    RatingModule,
    ConnectionServiceModule,
    TabViewModule,
    TimelineModule,
    NgChartsModule,
    MatGridListModule,
    MatListModule,
    VirtualScrollerModule,
    OverlayPanelModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorserviceService,multi:true },
    SupplierAuthGuard,
    StudentAuthGuard,
    ConfirmationService,
  MessageService,
  DialogService

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
