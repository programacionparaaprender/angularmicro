import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { environment } from 'src/app/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from 'src/app/views/menu/menu.component';
import { LoginUsuariosComponent } from 'src/app/views/tio/login-usuarios/login-usuarios.component';
import { RegistrarUsuariosComponent } from 'src/app/views/tio/registrar-usuarios/registrar-usuarios.component';
import { TokenizedInterceptorProviders } from "src/app/commons/services/tokenized.interceptor.service";
import { TarjetaCreditoComponent } from './views/tarjeta-credito/tarjeta-credito.component';
import { ListaUsuariosComponent } from './views/users/listar-usuarios/lista-usuarios.component';
import { TodoUsuariosComponent } from './views/users/todo-usuarios/todo-usuarios.component';
import { SlideComponent } from './views/slide/slide.component';
import { SidebarDirective } from './directivas/sidebar.directive';

@NgModule({
  declarations: [
    TarjetaCreditoComponent,
    AppComponent,
    MenuComponent,
    LoginUsuariosComponent,
    RegistrarUsuariosComponent,
    ListaUsuariosComponent,
    TodoUsuariosComponent,
    SlideComponent,
    SidebarDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    TokenizedInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
