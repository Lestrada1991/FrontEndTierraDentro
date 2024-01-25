import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './login.service';
import { Router } from '@angular/router';



/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,private authService: LoginService,private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      this.spinner.show(); // Muestra el loader antes de la solicitud
    
    return next.handle(request)
    .pipe(finalize(() =>{
      
        this.spinner.hide(); // Muestra el loader antes de la solicitud
      
  }),
  catchError((error: HttpErrorResponse) => {
    if ((error.status  === 403 || error.status=== 401)&& !this.router.url.includes('/users/login')){
      console.log("entro en error 403 interceptor");
      // Cerrar sesión y redirigir al usuario a la página de inicio de sesión
      this.authService.logout();
      window.location.href = 'users/login';
    }

    // Propaga el error para que otras partes de la aplicación también puedan manejarlo
    return throwError(error);
  }))
  
  }
}
export const RequestInterceptorProviders = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRequestInterceptor,
  multi:true
}]