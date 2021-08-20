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
}
