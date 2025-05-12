import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/commons/store/app.state';
import * as TaskActions from 'src/app/commons/store/login.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tio } from 'src/app/commons/models/tio';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuariosComponent } from 'src/app/views/tio/login-usuarios/login-usuarios.component';
import { Location } from "@angular/common";
import { TokenService } from 'src/app/services/token.service';
import { Usertoken } from 'src/app/models/usertoken';
import { MenuService } from 'src/app/services/menu.service';
import { ResponseMenu } from 'src/app/models/responsemenu';
import { Responseusertoken } from 'src/app/models/responseusertoken';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  //@ViewChild(LoginUsuariosComponent) child;
  //menus:ResponseMenu[] = [];
  menusAngular:ResponseMenu[] = [];
  tio: Tio;
  nombre = '';
  email = 'zddfdfdsfd';
  password = '';
  usuariologeado = false;
  constructor(
    location: Location, 
    private router: Router, 
    //private store: Store<AppState>,
    private menuService: MenuService,
    private tokenService: TokenService) {
      this.tio = new Tio("", "", "");
      //this.login = this.store.select('login');
    if(localStorage.getItem('login')){
      const json: string  | null = localStorage.getItem('login');
      if(json != null){
        const usuario:Usertoken = JSON.parse(json);
        if(usuario.token.length > 0){
          this.usuariologeado = true;
        }else{
          this.usuariologeado = false; 
          console.log('location')
          //console.log(this.router.url)
          //console.log(this.activatedRoute.url);
          //this.router.navigate(['/login']);
        }
      }
    }
  }

  async ngOnInit() {
    const response = await this.menuService.lista(); 
    if(response){
      this.menusAngular = response.data;
      this.menuService.setMenusArray(this.menusAngular);
    }else {
      console.log('no esta autorizado');
    }
     
  }

  get menus() {
    const menuString:string = this.menuService.getMenusArray();
    let MenusArray:ResponseMenu[] = []
    if(menuString.length > 0){
      MenusArray = JSON.parse(menuString);
    }
    return MenusArray;
  }

  /* ngAfterViewInit() {
    this.usuariologeado = this.child.usuariologeado
  } */

  get login(){
    return this.tokenService.getUser();
  }

  async logout() {
    const usuario: Responseusertoken = {
      access_token: "",
      token_type: "",
      refresh_token: "",
      expires_in: 0,
      scope: "",
      apellido: "",
      correo: "",
      nombre: "",
      jti: ""
    };
    this.usuariologeado = false;
    //this.store.dispatch(new TaskActions.InicioUsuario(usuario) )
    this.router.navigate(['/login']);
    this.tokenService.setUser(usuario);
    this.tokenService.logout();
    await this.ngOnInit();
    this.menuService.setMenusLimpiar();
  }

}
