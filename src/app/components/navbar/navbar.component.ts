import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { DocumentosService } from 'src/app/service/documentos.service';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  mobileQuery: MediaQueryList;
  id_fondo_documenta: number = 0;
  public subscriber: Subscription = new Subscription;

  constructor(media: MediaMatcher,public login: LoginService,private router:Router,private route: ActivatedRoute, public dialog: MatDialog,private fdocumental : DocumentosService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    
  }
  fondosDocumentales : ifondoDocumental[] = [];
  menuNav = [
    
    {name: "Documentos", route: "users/documentos/0", icon: "library_books", submenu:[
      {name: "Todos", route: "users/documentos/0", icon: "library_books"}
    ]}   
  ]
  
  combinedArray: any[] = [];
  ngOnInit(): void {
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
       console.log('The URL changed to: '  );
      
      this.getFondosDocumentales();
    });
    
     
   
  }
  public logout(){
    this.login.logout(); 
    window.location.reload();   
  }
combinearrays(){
  this.combinedArray = [...this.menuNav, ...this.fondosDocumentales];

     // Assuming there is only one item in menuNav for simplicity
     if (this.menuNav.length === 1) {
       const firstMenuItem = this.menuNav[0];
 
       // Replace the submenu of the first menu item with combinedArray
       firstMenuItem.submenu = this.combinedArray;
     }
 
     console.log(this.combinedArray);
}
  
  getFondosDocumentales(): any {
    
    this.fdocumental.getFondoDocumental()
    .subscribe((fondosd: any) => {
      console.log("fondos documentales: ", fondosd)
      this.fondosDocumentales = fondosd.fondoDocumentalResponse.fondoDocumental.map((item: any) => {
        return {
          name: item.nombre,  // Replace with the actual property name from your service
          icon: "library_books",   // Replace with the actual property id from your service
          route: 'users/documentos/'+item.id    // Your static route
        };
      });
      this.combinearrays();
    }, (error: any) => {
      console.error('Error obteniendo libros:', error);

    });
  }

 

}

export interface ifondoDocumental {
  id: number;
  nombre: string;
}