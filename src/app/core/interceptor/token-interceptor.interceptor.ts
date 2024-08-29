import { Injectable, Injector  } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SharedService } from 'src/app/shared/shared-service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private commonService: SharedService, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.commonService.userToken}`
      }
    });
    return next.handle(request)
      .pipe(
        catchError(
          (err: HttpErrorResponse) => {
            console.log(err);
            if (err.status === 401 && this.commonService.userToken) {
              this.toastr.warning('Please login again', 'Token is not valid or expired');
              this.commonService.signOut();
            }
            return throwError(err);
          }
        )
      );
  }
}
