import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {


  public user = {
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    username: '',
    password: '',
    role: ''
  }
  styleImage = 'document,book,old';
  constructor(private userService: UserService, private snack: MatSnackBar,private router: Router,) {


  }
  
  ngOnInit(): void {

  }

  onCancel(){
    this.router.navigate(['users/login'])
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
      position: 'relative',
    };
  }

  formSubmit() {


    console.log(this.user);
    if ((this.user.firstName == '' || this.user.firstName == null) ||
      (this.user.lastName == '' || this.user.lastName == null) ||
      (this.user.telefono == '' || this.user.telefono == null)) {
      this.snack.open('Por favor diligencie los campos obligatorios !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }
    /*if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre del usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }*/
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.user.email.match(EMAIL_REGEX)) {
      this.snack.open('El email ingresado no es valido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }
    if (this.user.password.length < 5) {
      this.snack.open('Ingrese una contraseña de mínimo 6 caracteres !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }
    this.user.role="USER"
    this.userService.registrarUsuario(this.user).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema !!', 'success')
        this.router.navigate(['users/login'])
      }, (error: any) => {
        console.log(error);
        this.snack.open('Ha ocurrido un errror en el sistema !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    )
  }
}
