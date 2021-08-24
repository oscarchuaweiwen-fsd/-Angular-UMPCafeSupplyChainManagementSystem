import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { rcustomValidation } from './rcustomValidator';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export interface UserInfo {
  u: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  role: any;
  date: any;
  form1: any;
  gender: any;
  visibility: any = true;
  user$ : Observable<any[]> | undefined;
  triggedMessage:any| undefined = true;
    
  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private service:AuthService,
    private _snackBar: MatSnackBar,
    private router:Router
  ) {
    this.form1 = fb.group(
      {
        remail: ['', [Validators.required, Validators.email]],
        rpassword: ['', [Validators.required, Validators.minLength]],
        rconfirmpassword: ['', [Validators.required]],
        name: ['', [Validators.required]],
        phonenumber: ['', Validators.required],
        date: ['', Validators.required],
        role: ['Role', [Validators.required,rcustomValidation.checkRole]],
        gender: ['Gender',[ Validators.required,rcustomValidation.checkGender]],
      },
      {
        validator: rcustomValidation.passwordVerification,
      }
    );
    
  }

  ngOnInit(): void {}

  // toggle visibility of password function
  onVisible() {
    this.visibility = !this.visibility;
  }

  getRole($event: any) {
    this.role = $event.target.value;
  }

  getDate($event: any) {
    this.date = $event.target.value;
  }

  getGender($event: any) {
    this.gender = $event.target.value;
  }

  get cp() {
    return this.form1.get('rconfirmpassword');
  }

  get p() {
    return this.form1.get('rpassword');
  }

  get e() {
    return this.form1.get('remail');
  }

  get name() {
    return this.form1.get('name');
  }

  get pn() {
    return this.form1.get('phonenumber');
  }

  get d() {
    return this.form1.get('date');
  }

  get g() {
    return this.form1.get('gender');
  }

  get r() {
    return this.form1.get('role');
  }

  //registration process
  async submit() {
    // // Check email address existed on firebase
    
    await this.service.checkExistedEmail(this.form1.get('remail')?.value);
    
    console.log(this.service.emailExistedStatus);
    
  

    // Registration process on firebase
    let x  = await this.service.register(this.form1.get('remail')?.value,this.form1.get('rpassword').value,this.form1.get('role')?.value);
  
  //   let tempo = x;
  //   console.log(tempo.validate)
  //  if(tempo == 'stupid'){
  //    this.triggedMessage = true;
  //   console.log("hellasdasd")
  //    setTimeout(()=>{
  //      this.triggedMessage = false;
  //    },2000);
  //  }


    if (x==true) {
      this.form1.setErrors({ emailExist: true });
      console.log(this.form1);
    }else{
      this.form1.setErrors({emailExist:false});
    }
    if(x.validate === true){
      this._snackBar.open("Register Successfully!","Close",{duration:3000,verticalPosition:'top',horizontalPosition:'center'})
      setTimeout(()=>{
        this.router.navigateByUrl("");
      },4000)
    }else{
      this._snackBar.open("Please try again!","Close",{duration:3000,verticalPosition:'top'})
    }
   
  }

  

}
