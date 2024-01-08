import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher,public login: LoginService,private router:Router, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    
  }
  menuNav = [
    
    {name: "Documentos", route: "users/documentos", icon: "library_books"},
    {name: "...", route: "", icon: "loyalty"},
    {name: "...", route: "", icon: "category"},
    
    
  ]
  ngOnInit(): void {
    console.log("navbar llego")
   
  }
  public logout(){
    this.login.logout(); 
    window.location.reload();   
  }

  
  

 

}

