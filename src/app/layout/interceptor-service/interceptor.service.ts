import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import {finalize} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public sharedService: SharedService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  this.sharedService.isLoading.next(true);
  return next.handle(req).pipe(
    finalize(
      () => {
        this.sharedService.isLoading.next(false);
      }
    )
  );
  }
}



