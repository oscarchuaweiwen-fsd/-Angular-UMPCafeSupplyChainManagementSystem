import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'registerPipe'
})
export class RegisterPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
