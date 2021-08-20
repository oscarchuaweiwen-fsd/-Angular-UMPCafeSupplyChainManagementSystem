import { AbstractControl, ValidationErrors } from "@angular/forms";


export class validatorCustom {
    static emailValidate(ac:AbstractControl):ValidationErrors | null { 
        const emailFormat = ['@gmail.com','@hotmail.com','@','.com']

        console.log(emailFormat.includes(ac.value));
        console.log(ac.value);
        if(emailFormat.includes(ac.value)){
            return {emailValidate:true};
        }else{
            return null
        }
    }
}