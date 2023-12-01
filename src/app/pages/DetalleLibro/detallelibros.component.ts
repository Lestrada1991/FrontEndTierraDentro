import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentosService } from 'src/app/service/documentos.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-detallelibros',
  templateUrl: './detallelibros.component.html',
  styleUrls: ['./detallelibros.component.scss']
})
export class DetalleLibrosComponent implements OnInit {
  public libroForm: FormGroup;
  public listCProduct:any;

  constructor(private login: LoginService,public dialog: MatDialog,private fb: FormBuilder, private documentoService: DocumentosService,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar:MatSnackBar, private dialogRef: MatDialogRef<DetalleLibrosComponent>){
      this.documentoService.getLibroByIdDcoument(data.documento.id)
      .subscribe((dataLibro:any)=>{
        
        if (dataLibro.metadata[0].code === "00") {
           this.listCProduct = dataLibro.libroResponse.libro[0];
           console.log("libro recuperado: ",this.listCProduct)
      }
        
      })
    console.log(data);

    this.libroForm = this.fb.group({
      titulo:[''],
      tema:['']
     
    });
    if (data != null) {
      
      this.updateForm(data)
      
      
    }
    }

  ngOnInit(): void {
    
  }
  
  updateForm(data: any) {
   
    
    
    
  }

  onCancel(){
    this.dialogRef.close(3)
  }


  /*onSave() {
      //console.log(this.seguimientoForm.get('Precio')?.value);
      //console.log(this.data.producto.id);  
      //console.log(this.login.getUser().id);  
      this.seguimientoPrecioService.saveSeguimientos(this.seguimientoForm.get('Precio')?.value,this.data.producto.id,this.login.getUser().id)
        .subscribe((data: any) => {
          console.log(data);        
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
        });
    }*/
  }

