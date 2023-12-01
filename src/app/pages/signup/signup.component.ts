import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  }
  constructor(private userService: UserService, private snack: MatSnackBar, private dialogRef: MatDialogRef<SignupComponent>) {


  }
  
  ngOnInit(): void {

  }
  onCancel(){
    this.dialogRef.close()
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
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre del usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }
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
    this.userService.registrarUsuario(this.user).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema !!', 'success')
        this.dialogRef.close();
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
