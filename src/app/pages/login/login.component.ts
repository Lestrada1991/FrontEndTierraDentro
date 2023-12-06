import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  styleImage = 'rainy';
  public form: FormGroup;

  loginData = {
    "email": "",
    "password": "",
  }

  constructor(private snack: MatSnackBar, public loginservices: LoginService, private router: Router, private fb: FormBuilder) {
    const user = loginservices.getUser();
    console.log("usuario en local: " + user);
    if (user != null) {
      var Rol = this.loginservices.getUserRole()
      console.log("ingreso al if del constructor");
      console.log("el rol es: " + Rol);
      if (Rol == "ADMIN") {
        //window.location.href='/admin';
        
        this.router.navigate(['home']);
        
        this.loginservices.loginStatusSuject.next(true)
      }
      else if (Rol == "USER") {
        //window.location.href='/dashboard';
        
        this.router.navigate(['home'])
        
        this.loginservices.loginStatusSuject.next(true)
      }
    };
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm(): any {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  unsplashClass(): any {
    return {
      'min-height': '100%',
      background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }

  login(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.loginData.password = this.form.get('password')?.value;
      this.loginData.email = this.form.get('username')?.value;
      this.formSubmit();
    }
  }

  formSubmit() {
    console.log("aqui llego")
    /*if(this.loginData.username.trim()=='' || this.loginData.username.trim()==null){
        this.snack.open("El nombre de usuario no puede estar vacio !!","Aceptar",{
          duration:3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        })
        return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password.trim()==null){
      this.snack.open("La contraseña es requerida !!","Aceptar",{
        duration:3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
      return;
  }*/
    this.loginservices.generateToken(this.loginData)
      .subscribe((data: any) => {
       
        //this.loginservices.loginUser(data.token)
        console.log("token guardado")
        this.loginservices.loginUser(data);
        //this.loginservices.getActualUser().subscribe((user: any) => {
          
          var Rol =  this.loginservices.getUserRole();         
          //this.loginservices.setUser(user);
          //console.log(user);
          //this.loginservices.loginUser(data.token);
          console.log();

          if (Rol === "ADMIN") {
            //window.location.href='/admin';
            
            this.router.navigate(['/home/documentos']);
            //window.location.reload(); 
            this.loginservices.loginStatusSuject.next(true)
            
          }
          else if (Rol === "USER") {
            //window.location.href='/dashboard';
            
            this.router.navigate(['/home/documentos'])
            //window.location.reload(); 
            this.loginservices.loginStatusSuject.next(true)
            
          }
          else {
            this.loginservices.logout();
          }

       // })

      }, (error: any) => {
        this.snack.open("Credenciales invalidas, por favor valide sus datos !!", "Aceptar", {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        })
      })
  }
}
