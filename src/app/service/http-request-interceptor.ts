import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators'
import { NgxUiLoaderService } from 'ngx-ui-loader';



/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngxUiLoaderService.start();
    return next.handle(request)
    .pipe(finalize(() =>{
      this.ngxUiLoaderService.stop()
  }))
  console.log(request)
  }

  


}