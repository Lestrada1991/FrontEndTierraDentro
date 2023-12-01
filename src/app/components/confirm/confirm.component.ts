import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosService } from 'src/app/service/documentos.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {


  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  //private productService= inject(SeguimientoprecioService);


  onNoClick(){
    this.dialogRef.close(3)
  }

  

  delete(){
    if (this.data != null){

      if (this.data.module == "seguimiento") {
      
      /*  this.productService.deleteProduct(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })*/
      } else if ( this.data.module == "product" )  {
         /*   this.productService.deleteProduct(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })*/
      } 

    } else {
      this.dialogRef.close(2);
    }
  }

}
