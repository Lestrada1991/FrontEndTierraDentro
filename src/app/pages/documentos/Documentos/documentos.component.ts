import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentosService } from 'src/app/service/documentos.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { DetalleLibrosComponent } from '../../DetalleLibro/detallelibros.component';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-product',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit{
  mobileQuery: MediaQueryList;

  
  constructor(
    private documentoService: DocumentosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,media:MediaMatcher,
    public login:LoginService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    console.log("llego al componente de documentos")
    console.log("documentos llego")
    this.getProducts();
  }

  displayedColumns: string[] = ['id_documento', 'titulo', 'contenido', 'tipoDocumento', 'picture', 'archivo'];
  dataSource = new MatTableDataSource<DocumentElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataCards: DocumentElement[] = []; // Todas las data cards
dataCardsPage: DocumentElement[] = []; // Data cards de la página actual

totalItems: number = 0; // Total de data cards
pageSizeOptions: number[] = [5, 10, 25, 50];
pageSize: number = 25; // Tamaño de página predeterminado

onPageChange(event: any) {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.dataCardsPage = this.dataCards.slice(startIndex, endIndex);
}

  /*getProducts(){
    this.productService.getProducts()
        .subscribe( (data:any) => {
          console.log("respuesta de productos: ", data);
          this.processProductResponse(data);
        }, (error: any) => {
          this.openSnackBar("Error al obtener productos", "Error");
          console.log("error en productos: ", error);
        }) 
  }*/

  getProducts() {
    this.documentoService.getProducts().subscribe((data: any) => {
      console.log("Documentos: ",data);
      if (data.metadata[0].code === "00") {
        let listCProduct = data.documentoResponse.documento;
        const dateProduct: DocumentElement[] = [];
       listCProduct.forEach((element: DocumentElement) => {
         //element.category = element.category.name;
         element.picture = element.picture = 'https://tierradentro.online/img' + element.picturePath;;
         dateProduct.push(element);
        });
        this.dataCards = dateProduct;
        this.totalItems = this.dataCards.length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Cargar la página inicial
      } 
    }, (error: any) => {
      if(error.status==404){
        this.openSnackBar("No se encontraron coincidencias", "OK");
      }
      else if(error.status==403){
      //  this.login.logout();
       // this.ngOnInit();
      }else{
      this.openSnackBar("Error al obtener documentos", "Error");
      console.log("error en productos: ", error);}
    });
  }

 /* processProductResponse(resp: any){
    const dateProduct: ProductElement[] = [];
     if( resp.metadata[0].code == "00"){
       let listCProduct = resp.product.products;

       listCProduct.forEach((element: ProductElement) => {
         //element.category = element.category.name;
         element.picture = 'data:image/jpeg;base64,'+element.picture;
         dateProduct.push(element);
       });

       //set the datasource
       this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
       this.dataSource.paginator = this.paginator;
     }
  }*/
   processProductResponse(resp: any) {
   // console.log(resp);
    if (resp.metadata[0].code === "00") {
      const dateProduct: DocumentElement[] = resp.product.products.map((element: DocumentElement) => {
       // element.url_imagen1 = 'data:image/jpeg;base64,' + element.url_imagen1;
       //this.dataSource=new MatTableDataSource<ProductElement>(dateProduct);
        return element;
      });

      this.dataSource = new MatTableDataSource<DocumentElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
    
  }

  

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })

  }



  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px', 
      data: {id: id, module: "product"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Documento eliminado", "Exitosa");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar documento", "Error");
      }
    });
  }

  buscar(name: any){
    var user: any;
    if ( name.length === 0){
      return this.getProducts();
    }
    if(this.login.isLoggedIn()){
      user=this.login.getUser().id;
    }else{
      user=0;
    }

    this.documentoService.getProductByName(name)
        .subscribe( (data: any) =>{
          if (data.metadata[0].code === "00") {
            let listCProduct = data.documentoResponse.documento;
        const dateProduct: DocumentElement[] = [];
       listCProduct.forEach((element: DocumentElement) => {
         //element.category = element.category.name;
         element.picture = element.picture = 'http://tierradentro:8689' + element.picturePath;
         dateProduct.push(element);
        });
            this.dataCards = dateProduct;
            this.totalItems = this.dataCards.length;
            this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Cargar la página inicial
          } 
        }, (error: any) => {
          if(error.status==404){
            this.openSnackBar("No se encontraron coincidencias", "OK");
          }else if(error.status==403){
            //this.login.logout();
            //this.ngOnInit();
          }else{
          this.openSnackBar("Error al obtener documentos", "Error");
          console.log("error en documentos: ", error);}
        });
  }

  exportExcel(){

    this.documentoService.exportProduct()
        .subscribe( (data: any) => {
          let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          let fileUrl = URL.createObjectURL(file);
          var anchor = document.createElement("a");
          anchor.download = "products.xlsx";
          anchor.href = fileUrl;
          anchor.click();

          this.openSnackBar("Archivo exportado correctamente", "Exitosa");
        }, (error: any) =>{
          this.openSnackBar("No se pudo exportar el archivo", "Error");
        })

  }

  openDetalleLibroDialog(documento: any) {
    //if(this.login.isLoggedIn()){
    //console.log("llamo al dialog")
    let userId= this.login.getUser();
    const dialogRef = this.dialog.open(DetalleLibrosComponent, {
      width: "650px",
      data: { documento: documento,userId:userId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Alerta de precio guardada", "Éxito");
        
      } else if (result == 2) {
        this.openSnackBar("Se generó un error al guardar el seguimiento", "Error");
      }
    });
  
 
  /*}
else{
  this.openSnackBar("Para usar esta funcionalidad es necesario haber iniciado sesión", "Inicie sesión");
  
}*/
  }
  

changebusqueda(name: any): void {
  console.log("se activo el change")
  if ( !name.trim()){
    return this.getProducts();
  }
}
openPDF(Ruta: string,id_doc:number) {
  console.log("Ruta: ",Ruta)
  const url = Ruta;
  const partes = url.split('/');
  const uuid = partes[partes.length - 1];
  console.log("id del archivo: ", uuid);
  var user_id = this.login.getUser().id;
  this.documentoService.descargarDocumentos(uuid,id_doc,user_id)
    .subscribe((data: Blob) => {
      console.log("respuesta de documentos: ", data);
      const pdfSrc = URL.createObjectURL(data);
      //this.pdfSrc = URL.createObjectURL(data);
      window.open(pdfSrc, '_blank', 'toolbar=0');
    }, (error: any) => {
      if (error.status == 404) {
        this.openSnackBar("No se encontraron coincidencias", "OK");
      } else if (error.status == 403) {
        //this.login.logout();
        //this.ngOnInit();
      } else {
        console.log("error en documentos: ", error);
      }
    })
  
}


}

export interface DocumentElement {
  id: number;
  titulo: string;
  contenido: number;
  filePath: string;
  tipoDocumento: any;
  picture: any;
  picturePath:any,
 
}
