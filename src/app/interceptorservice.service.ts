import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminServiceService } from './admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorserviceService implements HttpInterceptor {

  constructor(private admins:AdminServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.admins.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(()=>{
        this.admins.isLoading.next(false);
      })
    )
  }
}
