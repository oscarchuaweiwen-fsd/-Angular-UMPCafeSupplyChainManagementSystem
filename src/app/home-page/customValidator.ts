import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../auth.service";


export class validatorCustom {

     static validate(ac:AbstractControl):Promise<ValidationErrors | null>{
        return new Promise((resolve, reject) => {
            setTimeout((a:AuthService) => {
                console.log('helo');
                resolve({validate:true})
            },1000)
        })
    }
}