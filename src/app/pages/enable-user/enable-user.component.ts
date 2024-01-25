import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.scss']
})
export class EnableUserComponent implements OnInit {
  token: string = '';

  
  loginData = {
    "passwordConfirm": "",
    "password": "",
    "token":""
  }
  constructor( public loginservices: LoginService, private router: Router,private route: ActivatedRoute,private snack: MatSnackBar) {
  
}
ngOnInit(): void {
  
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];

    // Puedes realizar acciones adicionales con el token si es necesario
    if (this.token) {
      console.log('Token obtenido:', this.token);
      this.formSubmit();
      // Realizar acciones adicionales, como iniciar el proceso de restablecimiento de contraseña
    }
  });
  
}







formSubmit() {
  
  this.loginservices.enableuser(this.token)
    .subscribe((data: any) => {
      console.log("data")
     // this.loginservices.loginUser(data);
     //   var Rol =  this.loginservices.getUserRole();  
     if (data.status === 404) {
      this.snack.open(data.message, 'Aceptar', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass:  ['red-snackbar','red-snackbar'],
      },);
    }else{
      this.snack.open(data.message, 'Aceptar', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass:  ['green-snackbar','green-snackbar'],
      },);
    }
        this.router.navigate(['users/login']);
    }, (error: any) => {
      
      console.log("Error: ",error)
      if(error.status===200){
        error.error=error.error.text
      }else if(error.status===0){
        error.error="El servidor se encuentra fuera de línea."
      }
      this.snack.open(error.error, "Aceptar", {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['red-snackbar']
      })
      if(error.status===200){
      this.router.navigate(['users/login']);
      }
    })
}

}