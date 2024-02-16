import { Component, OnInit } from '@angular/core';
import { Tio } from 'src/app/commons/models/tio';
import { TioService } from 'src/app/views/tio/tio.service';
import { Router } from '@angular/router';

import { AppState } from 'src/app/commons/store/app.state';
import * as TaskActions from 'src/app/commons/store/login.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';
import { Usertoken } from 'src/app/models/usertoken';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Responseusertoken } from 'src/app/models/responseusertoken';
import { MenuService } from 'src/app/services/menu.service';
import { TioDto } from 'src/app/commons/dto/tioDto';

@Component({
  selector: 'app-login-usuarios',
  templateUrl: './login-usuarios.component.html',
  styleUrls: ['./login-usuarios.component.css']
})
export class LoginUsuariosComponent implements OnInit {
  login: Usertoken | null;
  tio: TioDto;
  nombre:string | null = '';
  password:string | null  = '';
  registerForm: FormGroup<any>;
  constructor(
    private tioService: TioService, 
    private router: Router,
    private fb: FormBuilder, 
    private menuService: MenuService,
    private tokenService: TokenService) { 
      this.registerForm = this.fb.group({ 
        nombre: ['', Validators.required], 
        password: ['', Validators.required]
      }); 
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

  ngOnInit() {
  }

  async onLogin() {
    if(!this.registerForm.valid){
      return;
    }
    try{
        const nombre = this.registerForm.getRawValue().nombre;
        const password = this.registerForm.getRawValue().password;
        this.tio = new TioDto(nombre, password);
        console.log(JSON.stringify(this.tio));
        await this.tokenService.login(this.tio);
        var responseusertoken: Responseusertoken | undefined | null = await this.tokenService.login(this.tio);
        
        if(responseusertoken){
          var data = responseusertoken.data;
          const usertoken: Usertoken = {
            token: data.token,
            tokenValidityInHours: data.tokenValidityInHours,
            tokenValidityInDays: data.tokenValidityInDays
          };
          this.tokenService.setUser(usertoken);
          this.tokenService.setToken(usertoken.token);
          await this.menuService.setMenus();
          this.router.navigate(['/tarjeta']);
        }else{
          console.log('ocurrio un error');
          console.log(JSON.stringify(responseusertoken));
        }
        /* this.tioService.login(this.tio).subscribe(
          data => {
            console.log('data:')
            console.log(JSON.stringify(data))
            console.log(JSON.stringify(data[0]))
            //alert(data.mensaje);
            //this.router.navigate(['/']);
          },
          err => {
            alert(err.error.mensaje);
          }
        ); */
    }catch(e){
      console.log(e);
    }
  }
}
