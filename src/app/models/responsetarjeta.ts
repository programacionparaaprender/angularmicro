import { TarjetaCredito } from "./tarjetacredito";


export class Responsetarjeta {
    message: string;
    data: TarjetaCredito[];
    constructor(message: string, data: TarjetaCredito[]) {
      this.message = message;
      this.data = data;
    }
  }
  
  
