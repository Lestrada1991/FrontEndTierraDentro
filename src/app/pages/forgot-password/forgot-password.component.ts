import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public user = {

    email: '',

  }
  constructor(private userService: LoginService, private snack: MatSnackBar, private dialogRef: MatDialogRef<ForgotPasswordComponent>) {


  }

  ngOnInit(): void {

  }
  onCancel() {
    this.dialogRef.close()
  }

  isMobileDevice(): boolean {
    return window.innerWidth <= 768; // Adjust threshold based on your needs
  }

  formSubmit() {

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.user.email.match(EMAIL_REGEX)) {
      this.snack.open('El email ingresado no es valido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      return;
    }

    this.user.email = this.user.email.toLowerCase()
    this.userService.forgotPassword(this.user).subscribe(
      (data: any) => {
        console.log("OK:", data);
        
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
        this.dialogRef.close();
      }, (error: any) => {
        console.log("error: ", error);
        if (error.status === 200) {
          error.error = error.error.text
        }

        this.snack.open(error.error, 'Aceptar', {
          duration: 8000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
        });
        if (error.status === 200) {
          this.dialogRef.close();
        }
      }
    )
  }
}

