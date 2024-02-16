export class TarjetaCredito {
  id?: number;
  titular: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvv: string;
  constructor(Titular: string, NumeroTarjeta: string, fechaExpiracion: string, CVV: string) {
    this.titular = Titular;
    this.numeroTarjeta = NumeroTarjeta;
    this.fechaExpiracion = fechaExpiracion;
    this.cvv = CVV;
  }
}


