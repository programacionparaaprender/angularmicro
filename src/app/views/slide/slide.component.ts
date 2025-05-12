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
import { TioDto } from 'src/app/commons/dto/tioDto';
import { Responseusertoken } from 'src/app/models/responseusertoken';


@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})


export class SlideComponent {
  //@ViewChild(LoginUsuariosComponent) child;
  login: Usertoken | null;
  tio: TioDto;
  nombre = '';
  email = 'zddfdfdsfd';
  password = '';
  usuariologeado = false;
  constructor(
    location: Location, 
    private router: Router, 
    //private store: Store<AppState>,
    private tokenService: TokenService) {
      //this.login = this.store.select('login');
    //this.login = this.store.select('login');
    this.tio = new TioDto("", "");
    this.login = null;
    if(localStorage.getItem('login')){
      const json: string  | null = localStorage.getItem('login');
      if(json != null){
        const usertoken:Usertoken = JSON.parse(json);
        this.login = usertoken;
        this.router.navigate(['/login']);
      }
    }
  }
  /* ngAfterViewInit() {
    this.usuariologeado = this.child.usuariologeado
  } */

 /*  get login(){
    return this.tokenService.getUser();
  } */

  logout() {
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
  }

}
