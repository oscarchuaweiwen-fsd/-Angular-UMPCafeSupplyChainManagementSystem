import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgotpassword-page',
  templateUrl: './forgotpassword-page.component.html',
  styleUrls: ['./forgotpassword-page.component.css']
})
export class ForgotpasswordPageComponent implements OnInit {
  form2:any;
  constructor(private fb:FormBuilder,private service:AuthService,private _snackBar: MatSnackBar,private router:Router) {
    this.form2 = this.fb.group({
      fpassword:['', [Validators.required,Validators.email]]
    })
   }

  ngOnInit(): void {
  }

  get fp(){
    return this.form2.get('fpassword')
  }

  async forgotPassword(){
    let x = await this.service.forgotPassword(this.form2.get('fpassword').value);
    if(x==true){
      this.form2.setErrors({'notfound':false});
      this._snackBar.open("Forgot Password Email Successfully!","Close",{duration:3000,verticalPosition:'top',horizontalPosition:'center'})
      setTimeout(()=>{
        this.router.navigateByUrl("");
      },4000)
    }else if(x==false){
      this.form2.setErrors({'notfound':true});
    }
   


  }


  
}
