import { Usertoken } from "./usertoken";


export interface Responseusertoken {
    access_token: string
    token_type: string
    refresh_token: string
    expires_in: number
    scope: string
    apellido: string
    correo: string
    nombre: string
    jti: string
}
  
  
