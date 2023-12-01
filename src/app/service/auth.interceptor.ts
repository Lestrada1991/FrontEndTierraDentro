import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginServices:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginServices.getToken();
        
        //console.log(token);
        if(token != null){
            authReq=authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`,'Access-Control-Allow-Origin': '*'}
                
            })

        }
        //console.log(authReq)
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
}]