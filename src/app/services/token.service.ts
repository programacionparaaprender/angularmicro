import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tio } from 'src/app/commons/models/tio';
import axios from "axios";
import { Usertoken } from 'src/app/models/usertoken';
import { Responseusuario } from 'src/app/models/responseusuario';
import { Responseusertoken } from 'src/app/models/responseusertoken';
import { TioDto } from 'src/app/commons/dto/tioDto';
import { RegistroDto } from '../commons/dto/registroDto';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  myApiUrl = "http://localhost:8080/api/auth";
  myApiUsuario = "http://localhost:8080/api/user/";
  KEYTOKEN = "KEYTOKEN";
  tokenURL = 'https://localhost:7107/token/';
  tioURL = 'http://localhost:8080/api/user/';
  apiv1URL = 'https://localhost:7107/api/v1';
  usuariologeado = false;
  constructor(private httpClient: HttpClient) { }

  async registrar(tio: RegistroDto){
    try{
      var response;
      response = await axios.post(this.tioURL + 'registrar', tio);
      return response;
      
    }catch(e: unknown | any){
      console.log("tio");
      console.log(JSON.stringify(tio));
      console.log("error");
      console.log(e);
      return e.response;
    }
  }

  async login(user: TioDto) {
    var token:string = "";
    var response:Responseusertoken | null = null;
    try{    
    ///response = await this.httpClient.post<Usertoken>(this.myApiUrl + 'token', user).toPromise();
    console.log(JSON.stringify(user));
    const headers = {
      'Authorization':'Basic frontendapp:12345',
      'Content-Type':'application/x-www-form-urlencoded'
    }
    const body = {
      'username': user.username,
      'password': user.password,
      'grant_type': 'password'
    };
    //this.httpClient.post(url , body, {headers: headers});   
    response = await axios.post(this.myApiUrl + '/token', { headers: headers, params: body});
    if(response != null){
        console.log('response: '+ JSON.stringify(response));
        this.setUser(response);
        token = response.access_token;
        window.localStorage.removeItem('token');
        window.localStorage.setItem('token', token);   
        console.log("token: " + window.localStorage.getItem('token')); 
    }
    }catch(e){
        console.log(e);
    }
    return response;
  } 

  setUser(user: Responseusertoken):void   {
    localStorage.setItem('login', JSON.stringify(user));
  }

  getUser():Responseusertoken | null  {
    let user: Usertoken;
    let cadena: string | null = localStorage.getItem('login');
    if(cadena != null){
      const user: Responseusertoken = JSON.parse(cadena);
      return user;
    }
    return null;
  }

  setToken(token: string): void{
    localStorage.setItem('token', token);
    
  }

  obtenerToken(){
    const token = localStorage.getItem('token');
    return token;
  }

  async listaName(name: string) {
    var response;
    try{
        response = await this.httpClient.get<Tio[]>(this.apiv1URL + '/users/' + name + '/todos').toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
      }catch(e: unknown | any){
        return e.response;
      }
    return response;
  }

  async listaId() {
    var response;
    try{
        const id:string = "0";
        response = await this.httpClient.get<Tio[]>(this.apiv1URL + '/users/' + id + '/id').toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        

      }catch(e: unknown | any){
        return e.response;
      }
    return response;
  }

  async listaSinToken() {
    var response;
    try{
        response = await this.httpClient.get<Tio[]>(this.myApiUsuario).toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
      }catch(e: unknown | any){
        return e.response;
      }
    return response;
  }

  async lista() {
    var response;
    try{
        const token = localStorage.getItem('token');
        console.log('token: ' + token);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
        const requestOptions = { headers: headers };
        response = await this.httpClient.get<Tio[]>(this.myApiUsuario + "list", requestOptions).toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
      }catch(e: unknown | any){
        return e.response;
      }
    return response;
  }


  

  async logout() {
    try{
        window.localStorage.removeItem('token');
    }catch(e){
        console.log(e);
    }
  } 

  async login2() {
    var token = "";
    //const username:string = "randomuser123";
    //const password:string = "password";
  
    const username:string = "luis13711";
    const password:string = "123456";

    const user = {
      "username": username,
      "password": password
    }
    try{
        var response;
        // en el post también al final se coloca , { 'headers': headers }
        response = await this.httpClient.post<any>(this.tokenURL + 'login', user).toPromise();
        if(response){
            token = response.token;
            window.localStorage.removeItem('token');
            window.localStorage.setItem('token', token);
            return token;
        }
        
    }catch(e){
        console.log(e);
        return token;
    }
    return "";
    
  } 
}
