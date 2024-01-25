import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helperautentication'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //public baseUrl='http://tierradentro:8080/api/v1'
  constructor(private httpClient: HttpClient) { }

  public registrarUsuario(user:any){
    //console.log(user.username)
    return this.httpClient.post(`${baseUrl}/auth/register`,user);
  }

  public consultarUsuario(username:any){
    //console.log(username)
    return this.httpClient.get(`${baseUrl}/auth/signup`,username);
  }

  public eliminarUsuario(userid:any){
    //console.log(userid)
    return this.httpClient.delete(`${baseUrl}/user`,userid);
  }
}
