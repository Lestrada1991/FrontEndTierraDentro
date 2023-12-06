import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';



/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      this.spinner.show(); // Muestra el loader antes de la solicitud
    
    return next.handle(request)
    .pipe(finalize(() =>{
      
        this.spinner.hide(); // Muestra el loader antes de la solicitud
      
  }))
  
  }
}
export const RequestInterceptorProviders = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRequestInterceptor,
  multi:true
}]