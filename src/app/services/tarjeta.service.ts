import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetacredito';
import { Responsetarjeta } from '../models/responsetarjeta';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl2 = "https://localhost:5001/api/tarjeta/";
  myApiUrl = "http://localhost:8080/api/tarjeta/";
  KEYTOKEN = "KEYTOKEN";
  constructor(private http: HttpClient) {
    
  }

  getListTarjetas(): Observable<TarjetaCredito[]>{
    return this.http.get<TarjetaCredito[]>(this.myApiUrl);
  }

  deleteTarjeta(id: number): Observable<TarjetaCredito> {
    return this.http.delete<any>(this.myApiUrl + String(id));
  }
  
  /* async saveAsyncTarjeta(tarjeta: any) {
    const response = await this.http.post<TarjetaCredito>(this.myApiUrl, tarjeta) 
    return this.http.post<TarjetaCredito>(this.myApiUrl, tarjeta);
  }  */

  async saveAsyncTarjeta(tarjeta: any){
    try{
      var response;
      response = await axios.post(this.myApiUrl, tarjeta);
      return response;
      
    }catch(e: unknown | any){
      console.log("tio");
      console.log(JSON.stringify(tarjeta));
      console.log("error");
      console.log(e);
      return e.response;
    }
  }

  saveTarjeta(tarjeta: any): Observable<TarjetaCredito> {
      return this.http.post<TarjetaCredito>(this.myApiUrl, tarjeta);
  }

  updateTarjeta(tarjeta: TarjetaCredito, id: number): Observable<any> {
    return this.http.put<any>(this.myApiUrl + `${id}`, tarjeta);
  }
}
