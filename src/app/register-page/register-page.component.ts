import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { rcustomValidation } from './rcustomValidator';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  user$: Observable<any[]> | undefined;
  triggedMessage: any | undefined = true;
  student:boolean = false;
  supplier:boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private service: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form1 = fb.group(
      {
        remail: ['', [Validators.required, Validators.email]],
        rpassword: ['', [Validators.required, Validators.minLength]],
        rconfirmpassword: ['', [Validators.required]],
        name: ['', [Validators.required]],
        phonenumber: ['', Validators.required],
        date: ['', Validators.required],
        role: ['Role', [Validators.required, rcustomValidation.checkRole]],
        gender: [
          'Gender',
          [Validators.required, rcustomValidation.checkGender],
        ],
        matrix: [''],
        comp:['']
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


  // Output
  getRole($event: any) {

    this.role = $event.target.value;
    if(this.role == 1){
      this.student = true;
      this.supplier = false;
    }else if(this.role==2){
      this.supplier = true;
      this.student = false;
    }else if(this.role == 'Role'){
      this.student = false;
      this.supplier = false;
    }

    console.log(this.role);
  }

  checkform(form:any){
    console.log(form);
    for (let el in this.form1.controls) {
      if (this.form1.controls[el].errors) {
        console.log(el)
      }
 }  
  }

  checkEmpty($event:any){
    console.log($event.target.value.length);
    if($event.target.value.length == 0){
      this.form1.setErrors({
        matrixError:true
      })
    }else if($event.target.value.length >0){
      this.form1.setErrors(null)
    }

  }

  getDate($event: any) {
    this.date = $event.target.value;
  }

  getGender($event: any) {
    this.gender = $event.target.value;
  }

  // Form Control Name

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

  get matrix(){
    return this.form1.get('matrix');
  }

  get comp(){
    return this.form1.get('comp');
  }


  //registration process
  async submit() {
    // // Check email address existed on firebase

    await this.service.checkExistedEmail(this.form1.get('remail')?.value);

    console.log(this.service.emailExistedStatus);

    // Registration process on firebase
    let x = await this.service.register(
      this.form1.get('remail')?.value,
      this.form1.get('rpassword').value,
      this.form1.get('role')?.value,
      this.form1.get('name')?.value,
      this.form1.get('date')?.value,
      this.form1.get('phonenumber')?.value,
      this.form1.get('gender')?.value,
      this.form1.get('matrix')?.value,
      this.form1.get('comp')?.value
    );

    if (x == true) {
      this.form1.setErrors({ emailExist: true });
      console.log(this.form1);
    } else {
      this.form1.setErrors({ emailExist: false });
    }
    if (x.validate === true) {
      this._snackBar.open('Register Successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 4000);
    } else {
      this._snackBar.open('Please try again!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }
}
