import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import {MatFormFieldModule} from '@angular/material/form-field';
import { RegisterPipePipe } from './register-pipe.pipe';
import { RegisterDDirective } from './register-d.directive';
import { ForgotpasswordPageComponent } from './forgotpassword-page/forgotpassword-page.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminAuthGuard } from './adminauthguard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    RegisterPipePipe,
    RegisterDDirective,
    ForgotpasswordPageComponent,
    AdminHomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatPasswordStrengthModule,
    MatFormFieldModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule

  ],
  providers: [AuthGuard,AuthService,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
