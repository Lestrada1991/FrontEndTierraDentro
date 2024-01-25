import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  styleImage = 'document,book,old';
  public form: FormGroup;
  
  loginData = {
    "passwordConfirm": "",
    "password": "",
    "token":""
  }
  constructor(private snack: MatSnackBar, public loginservices: LoginService, private router: Router,private route: ActivatedRoute, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
ngOnInit(): void {
  this.buildForm();

  this.route.queryParams.subscribe(params => {
    this.token = params['token'];

    // Puedes realizar acciones adicionales con el token si es necesario
    if (this.token) {
      console.log('Token obtenido:', this.token);
      // Realizar acciones adicionales, como iniciar el proceso de restablecimiento de contraseña
    }
  });
  
}
private buildForm(): any {
  this.form = this.fb.group({
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

isMobileDevice(): boolean {
  return window.innerWidth <= 768; // Adjust threshold based on your needs
}

unsplashClass(): any {
  return {
    'min-height': '100%',
    background: `url("/assets/0.jpg") no-repeat center center`,
    //background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
    'background-size': 'cover',
    'background-position': '50% 50%',      
    position: 'relative',
  };
}

reset(event: Event): any {
  event.preventDefault();
  if (this.form.valid) {
    const value = this.form.value;
    this.loginData.password = this.form.get('password')?.value;
    this.loginData.passwordConfirm = this.form.get('confirmPassword')?.value;
    this.loginData.token=this.token
    this.formSubmit();
  }
}

formSubmit() {
  
  this.loginservices.resetpassword(this.loginData)
    .subscribe((data: any) => {
      console.log("data")
      //this.loginservices.loginUser(data);
        //var Rol =  this.loginservices.getUserRole();  
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
        panelClass:['red-snackbar']
      })
      if(error.status===200){
      this.router.navigate(['users/admin']);
      }
    })
}

}