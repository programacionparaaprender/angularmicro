import { Component, OnInit } from '@angular/core';
import { Tio } from 'src/app/commons/models/tio';
import { TioService } from '../tio.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usertoken } from 'src/app/models/usertoken';
import { TokenService } from '../../../services/token.service';
import { Responseusertoken } from 'src/app/models/responseusertoken';
import { MenuService } from 'src/app/services/menu.service';
import { TioDto } from 'src/app/commons/dto/tioDto';
import { RegistroDto } from 'src/app/commons/dto/registroDto';


@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  login: Usertoken | null;
  nombre = '';
  email = 'zddfdfdsfd';
  password = '';
  tio: RegistroDto;
  registerForm: FormGroup;
  usuariologeado = false;
  constructor(
    private tioService: TioService, 
    private tokenService: TokenService, 
    private menuService: MenuService,
    private fb: FormBuilder, 
    private router: Router) {
      this.registerForm = this.fb.group({ 
        id:0,
        nombre: ['', Validators.required], 
        email: ['', Validators.maxLength(32)],
        password: ['', Validators.required]
      }); 
      //this.login = this.store.select('login');
      this.tio = new RegistroDto("", "", "");
      this.login = null;
      
  }

  ngOnInit() {
  }

  async onCreate() {
    if(!this.registerForm.valid){
      return;
    }
    try{
      //const nombre = this.registerForm.get('nombre').value;
        //const email = this.registerForm.get('email').value
        //const password = this.registerForm.get('password').value
        const nombre = this.registerForm.getRawValue().nombre;
        const email = this.registerForm.getRawValue().email;
        const password = this.registerForm.getRawValue().password;
        this.tio = new RegistroDto(nombre, email, password);
        //var response = await this.tioService.registrar(this.tio);
        var responseusertoken: Responseusertoken | undefined | null = await this.tokenService.registrar(this.tio);
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
    }catch(e){
      console.log(e);
    }
    
  }
}
