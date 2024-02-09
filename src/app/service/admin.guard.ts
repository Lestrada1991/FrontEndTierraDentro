import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


export const adminGuard: CanActivateFn = (
  
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  
) => {
  
  const snack= inject(MatSnackBar);
  const authService = inject(LoginService);
  const router = inject(Router);
  console.log("!guard: ",authService.isLoggedIn());
  if(authService.isLoggedIn() ){
    //if(authService.getUserRole()=='ADMIN' || authService.getUserRole()=='USER'){
      if( authService.getUserRole()=='USER'){
    return true;
  }
  else{
    authService.logout();
    //window.location.replace("users/login");
    snack.open('El módulo de consulta no permite iniciar sesión con cuentas de administrador. Por favor, cree una cuenta de usuario estándar para acceder al sistema, las secciones activas se cerraran por seguridad.', 'Aceptar', {
      duration: 3900,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass:  ['red-snackbar','red-snackbar'],
    },);
    setTimeout(() => {
      window.location.replace('users/login');
    }, 4000);
    
    return of(false);
  }}
  else {
   
      router.navigate(['users/login']);
      return of(false);
    }

    
}


