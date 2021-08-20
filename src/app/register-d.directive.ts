import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appRegisterD]'
})
export class RegisterDDirective {

  constructor(private el:ElementRef) { }

  @HostListener('blur') onBlur(){
    let uppercase:string = this.el.nativeElement.value;
    this.el.nativeElement.value = uppercase.toUpperCase();
  }

}
