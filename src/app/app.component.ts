import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Gestor-Comercial-FrontEnd';
 
  constructor(public loginservices: LoginService
    
  ){ }
  
  ngOnInit() {
    
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  
}
