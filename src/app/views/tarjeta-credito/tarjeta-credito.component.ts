import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { Observable } from 'rxjs';
import { TarjetaCredito } from '../../models/tarjetacredito';
import { Responsetarjeta } from 'src/app/models/responsetarjeta';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];
  form: FormGroup;
  accion = "Agregar";
  data = "Datos del hijo";
  id: number | undefined;
  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService) {

    this.form = this.fb.group({
      tarjetaId: [''], 
      titular: ['', Validators.required], 
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    }); 
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(): void {
    this._tarjetaService.getListTarjetas().subscribe((res:TarjetaCredito[]) => {
      this.listTarjetas = res;
      console.log("listar tarjetas");
      console.log(this.listTarjetas);
    }, error => {
      console.log(error);
    });
  }

  async agregarTarjeta(){
    try{
      //console.log(this.form)
      var tarjeta: TarjetaCredito = {
        id:0,
        titular: this.form.get('titular')?.value, 
        numeroTarjeta: String(this.form.get('numeroTarjeta')?.value), 
        fechaExpiracion: this.form.get('fechaExpiracion')?.value, 
        cvv: this.form.get('cvv')?.value
      } 
      console.log(tarjeta);
      if(this.id == undefined || this.id == 0){
        const response = await this._tarjetaService.saveAsyncTarjeta(tarjeta);
        console.log("response");
        console.log(JSON.stringify(response));
        this.obtenerTarjetas();
        //this.toastr.success('Hello world!', 'Tarjeta registrada!');
        this.form.reset();
      
      }else{
        //console.log("Actualizar tarjeta");
        tarjeta.id = this.id;
        this._tarjetaService.updateTarjeta(tarjeta, this.id).subscribe(data => {
          //console.log(data);
          this.obtenerTarjetas();
          //this.toastr.success('Hello world!', 'Tarjeta actualizada!');
          this.form.reset();
          this.id = 0;
          this.accion = "Agregar";
        }, error => {
          console.log(error);
          //this.toastr.error('Tarjeta no fue actualizada con exito!', error);
        }); 
      }
    }catch(e){
      console.log(e);
    }
  }

  agregarTarjetaAntiguo(): void{
    //console.log(this.form)
    var tarjeta: TarjetaCredito = {
      id:0,
      titular: this.form.get('titular')?.value, 
      numeroTarjeta: String(this.form.get('numeroTarjeta')?.value), 
      fechaExpiracion: this.form.get('fechaExpiracion')?.value, 
      cvv: this.form.get('cvv')?.value
    } 
    console.log(tarjeta);
    if(this.id == undefined || this.id == 0){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
      //console.log(data);
      this.obtenerTarjetas();
      //this.toastr.success('Hello world!', 'Tarjeta registrada!');
      this.form.reset();
    }, error => {
      console.log(error);
      //this.toastr.error('Tarjeta no fue registrada con exito!', error);
    }); 
    }else{
      //console.log("Actualizar tarjeta");
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(tarjeta, this.id).subscribe(data => {
        //console.log(data);
        this.obtenerTarjetas();
        //this.toastr.success('Hello world!', 'Tarjeta actualizada!');
        this.form.reset();
        this.id = 0;
        this.accion = "Agregar";
      }, error => {
        console.log(error);
        //this.toastr.error('Tarjeta no fue actualizada con exito!', error);
      }); 
    }
  }

  eliminarTarjeta(tarjeta: TarjetaCredito): void{
    let id:number | undefined = tarjeta.id;
    //console.log(index);
    //this.listTarjetas.splice(index, 1);
    if(id != undefined){
      this._tarjetaService.deleteTarjeta(id).subscribe(data => {
        //console.log(data);
        this.obtenerTarjetas();
        //this.toastr.success('Tarjeta eliminada con exito!', 'Tarjeta eliminada!');
      }, error => {
        //console.log(error);
        //this.toastr.error('Tarjeta no fue eliminada con exito!', error);
      });
    }
  }

  editarTarjeta(tarjeta: TarjetaCredito): void {
    this.accion = "Editar";
    this.id = tarjeta.id;
    this.form.patchValue({
      tarjetaId: tarjeta.id,
      titular: String(tarjeta.titular),
      numeroTarjeta: parseInt(tarjeta.numeroTarjeta),
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: String(tarjeta.cvv)
    });
    console.log(tarjeta.titular);
    console.log(tarjeta);
  }

}
