import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class rcustomValidation {
  constructor() {}

  static passwordVerification(ac: AbstractControl): ValidationErrors | null {
    let newPassword = ac.get('rpassword');
    let confirmPassword = ac.get('rconfirmpassword');

    if (newPassword?.value !== confirmPassword?.value) {
      return { passwordVerification: true };
    } else {
      return null;
    }
  }

  static checkRole(ac:AbstractControl):ValidationErrors|null{
    if(ac.value === "Role"){
      console.log("Role");
      return {checkRole: true};
    }else{
      return null;
    }

  }

  static checkGender(ac:AbstractControl):ValidationErrors|null{
    if(ac.value === "Gender"){
      console.log("Gender");
      return {gender: true};
    }else{
      return null;
    }

  }

  static checkMatricCard(ac:AbstractControl):ValidationErrors|null{
    if(ac.value === "Matric Card Number"){
      console.log("Matric Card Number");
      return {checkMatrixCard: true};
    }else{
      return null;
    }

  }

  static checkCompanyName(ac:AbstractControl):ValidationErrors|null{
    if(ac.value === "Company Name"){
      console.log("Matrix Card");
      return {checkMatrixCard: true};
    }else{
      return null;
    }

  }
}
