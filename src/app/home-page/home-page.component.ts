import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { from, Observable } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { validatorCustom } from './customValidator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  // variables declaration
  email: string = '';
  password: string = '';
  errMessage: string = '';
  form: any;
  visibility: boolean = true;
  user: any;

  // calling api
  constructor(private fb: FormBuilder, private service: AuthService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // const food = ['sandwich', 'burger', 'pizza'];

    // const food$ = from(food);

    // food$.pipe(
    //   switchMap((food) => { 
    //    return this.example(food)
    //   }),
    //   map((food) =>console.log(food))
    
    // ).subscribe(res=>{
    //   console.log(res);
    // })

    
  }

  example(message:any):Observable<string> {
    return of(message);
}

  // toggle visibility of password function
  onVisible() {
    this.visibility = !this.visibility;
  }

  // login function
  async login() {
    console.log(this.form);
    await this.service.login(this.form.value.email, this.form.value.password);

    // validation of homepage

    if (this.service.emailVerified === false) {
      this.form.setErrors({
        emailVerify: true,
        wrongpassword: false,
        notregister: false,
      });
    } else if (this.service.passwordVerified === false) {
      this.form.setErrors({ wrongpassword: true, notregister: false });
    } else if (this.service.userVerified === false) {
      this.form.setErrors({ notregister: true, wrongpassword: false });
    }
  }

  sendVerifyEmail() {
    this.service.verificationemail();
  }

  //return the form control name
  get emailaddress() {
    return this.form.get('email');
  }

  get getpassword() {
    return this.form.get('password');
  }
}
