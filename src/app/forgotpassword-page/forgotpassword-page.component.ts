import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword-page',
  templateUrl: './forgotpassword-page.component.html',
  styleUrls: ['./forgotpassword-page.component.css']
})
export class ForgotpasswordPageComponent implements OnInit {
  form2:any;
  constructor(private fb:FormBuilder,private auth:AngularFireAuth) {
    this.form2 = this.fb.group({
      fpassword:['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  get fp(){
    return this.form2.get('fpassword')
  }

  forgotPassword(){
    this.auth.sendPasswordResetEmail(this.form2.get('fpassword').value).then(res=>{
      console.log(res);
    })
  }

}
