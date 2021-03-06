import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { from, Observable } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';
import { AuthService } from '../authService/auth.service';
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
  constructor(private fb: FormBuilder, private service: AuthService,private messageService: MessageService) {
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
    const result = await this.service.login(this.form.value.email, this.form.value.password);

    // validation of homepage
    console.log(await this.service.getStudentStatus());

    const studentStatus = await this.service.getStudentStatus();
    const supplierStatus = await this.service.getSupplierStatus();
    console.log(studentStatus,supplierStatus);
    if(!studentStatus ) {
      this.messageService.add({key: 'myKey1',severity:'error', summary:'Permission Info', detail:'Please contact the administrator to approve your status!'});
    }

    if(!supplierStatus) {
      this.messageService.add({key: 'myKey2',severity:'error', summary:'Permission Info', detail:'Please contact the administrator to approve your status!'});
    }

    if (this.service.emailVerified === false) {
      this.form.setErrors({
        emailVerify: true,
        wrongpassword: false,
        notregister: false,
      });
    } else if (this.service.passwordVerified === false) {
      console.log("wrong password ts")
      this.form.setErrors({ wrongpassword: true, notregister: false });
    } else if (this.service.userVerified === false) {
      console.log("object");
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
