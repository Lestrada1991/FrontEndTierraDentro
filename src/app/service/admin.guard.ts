import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginService } from './login.service';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (
  
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  console.log(authService.isLoggedIn());
  if(authService.isLoggedIn() ){
    if(authService.getUserRole()=='ADMIN' || authService.getUserRole()=='USER'){
    return true;
  }
  else{
    return router.navigate(['users/login']);
    return of(false);
  }}
  else {
   
      router.navigate(['users/login']);
      return of(false);
    }
  
}


