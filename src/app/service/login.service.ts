import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrlLogin from './helperautentication'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //public baseUrlLogin='http://tierradentro:8080/api/v1'
  
  
  public loginStatusSuject = new Subject<boolean>();

  constructor(private httpClient:HttpClient) { }
//generar token
  public generateToken(loginData:any){
    return this.httpClient.post(`${baseUrlLogin}/auth/authenticate`,loginData)
  }

  public forgotPassword(loginData:any){
    return this.httpClient.post(`${baseUrlLogin}/auth/forgot-password`,loginData)
  }
  public resetpassword(loginData:any){
    return this.httpClient.post(`${baseUrlLogin}/auth/reset-password`,loginData)
  }
  public enableuser(loginData:any){
    return this.httpClient.post(`${baseUrlLogin}/auth/enable-user`,loginData)
  }
//iniciar sesion  y establecer el token en el localstorage
  public loginUser(token:any){
    //console.log(JSON.stringify(token))
    localStorage.setItem('token',token.token)
    localStorage.setItem('user',JSON.stringify(token.object))
  
  }
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    else{
      return true;
    }
  }

  //Cerrar sesión y eliminar token del localstore
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;

  }
  //obtener token
  public getToken(){
    return localStorage.getItem('token');
    
  }

  

  //obtener usuario en localstore
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }
   //obtener roles de usuario 
   public getUserRole(){
    let user= this.getUser();
    
    console.log("user rol: " + user.role);
    return user.role
  }

  public getActualUser(){
    return this.getUser();
  }
}
