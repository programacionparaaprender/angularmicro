export class ResponseMenu {
  id?: number;
  nombre: string;
  url: string;
  hijo: number;
  constructor(nombre: string, url: string, hijo: number) {
    this.nombre = nombre;
    this.url = url;
    this.hijo = hijo;
  }
}


