import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { validatorCustom } from './customValidator';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // variables declaration
  email: string = '';
  password: string = '';
  errMessage: string = '';
  form:any;
  visibility:boolean = true;

  // calling api
  constructor(private fAuth:AngularFireAuth,private fb:FormBuilder) {
    this.form = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  // toggle visibility of password function
  onVisible(){
    this.visibility = !this.visibility;
  }

  // login function
  login(){
    
    console.log(this.form);
    this.fAuth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password).then(res=>{
      console.log(res);
      
      if(!res.user?.emailVerified){
        this.form.setErrors({'emailVerify':true,'wrongpassword':false,'notregister':false});
      }
    }).catch(err => {
      if(err.code === "auth/wrong-password"){
        this.form.setErrors({'wrongpassword':true,'notregister':false});
      }

      if(err.code === "auth/user-not-found"){
        this.form.setErrors({'notregister':true,'wrongpassword':false});
      }
    })

  }

  //return the form control name
  get emailaddress(){
    return this.form.get('email');
  }

  get getpassword(){
    return this.form.get('password');
  }

}
