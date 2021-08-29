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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorserviceService } from './interceptorservice.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {AccordionModule} from 'primeng/accordion';   
import {MenuItem} from 'primeng/api';  
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
    AdminAddOrderPageComponent
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
    PasswordModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AdminAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorserviceService,multi:true },
    ConfirmationService,
    SupplierAuthGuard,
    StudentAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
