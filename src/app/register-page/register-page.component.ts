import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { rcustomValidation } from './rcustomValidator';


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
  visibility: any =true;
  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {
    this.form1 = fb.group(
      {
        remail: ['', [Validators.required,Validators.email]],
        rpassword: ['', Validators.required],
        rconfirmpassword: ['', [Validators.required]],
        name: ['', [Validators.required]],
        phonenumber: ['', Validators.required],
        date: ['', Validators.required],
      },
      {
        validator: rcustomValidation.passwordVerification,
      }
    );
  }

  ngOnInit(): void {}


  // toggle visibility of password function
  onVisible(){
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

  

  submit() {

    
    // Check email address existed on firebase
    this.auth
      .fetchSignInMethodsForEmail(this.form1.get('remail').value)
      .then((res) => {
        if (res.length === 1) {
          this.form1.setErrors({ emailExist: true });
          console.log(this.form1);
        }
      });

    // Registration process on firebase
    this.auth
      .createUserWithEmailAndPassword(
        this.form1.get('remail').value,
        this.form1.get('rpassword').value
      )
      .then((res) => {
        console.log(res);

        // Send verification email to the registered email address
        this.auth.currentUser.then(user=>{
          user?.sendEmailVerification()
        }).then(res=>{
          console.log(res);
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }
}
