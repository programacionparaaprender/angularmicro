import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMenu } from '../models/responsemenu';
import { Responsetarjeta } from '../models/responsetarjeta';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  myAppUrl2 = "https://localhost:5001/";
  myApiUrl = "http://localhost:8080/api/menu/";
  KEYTOKEN = "KEYTOKEN";
  MENU = "MENU";
  constructor(private httpClient: HttpClient) {

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
        response = await this.httpClient.get<ResponseMenu[]>(this.myApiUrl).toPromise();
        //response = await this.httpClient.get<ResponseMenu[]>(this.myApiUrl, requestOptions).toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        

      }catch(e: unknown | any){
        return e.response;
      }
    return response;
  }

  async setMenus(){
    const response = await this.lista(); 
    if(response){
      const menusAngular = response;
      this.setMenusArray(menusAngular);
    }else {
      console.log('no esta autorizado');
    }
  }

  setMenusLimpiar(): void{
    const menus = JSON.stringify([]);
    localStorage.setItem(this.MENU, menus);
  }

  setMenusArray(MenusArray:ResponseMenu[]): void{
    const menus = JSON.stringify(MenusArray);
    localStorage.setItem(this.MENU, menus);
  }

  getMenusArray(): string{
    const menu = localStorage.getItem(this.MENU);
    if(menu != null){ 
      return menu;
    }
    return "";
  }

  getMenus(): Observable<ResponseMenu> {
    return this.httpClient.get<ResponseMenu>(this.myApiUrl);
  }

  

}
