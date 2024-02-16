import { Tio } from "../commons/models/tio";

export class Responseusuario{
  message: string;
  data: Tio;
  constructor(message: string, data: Tio) {
    this.message = message;
    this.data = data;
  }
}


