import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ServiciosService } from 'app/main/actividades/tbl-actividades/servicios.service';

@Component({
  selector: 'app-listado-marcaciones',
  templateUrl: './listado-marcaciones.component.html',
  styleUrls: ['./listado-marcaciones.component.scss']
})
export class ListadoMarcacionesComponent implements OnInit {
  public listUserIdMarcacion:Array<any>=[]
  constructor(public json: ServiciosService) { }

  ngOnInit(): void {
    
    console.log("Recibiendo data Marcacion 2.1 ", this.json.disparadorFavoritos);
    this.json.disparadorFavoritos.subscribe( data =>{
     console.log("Recibiendo data Marcacion 2.2 ", data);
     this.listUserIdMarcacion.push(data);
   })
  }

  onInformacion(){
    console.log(document.getElementById('desde'));
    console.log(document.getElementById('hasta'));
  }

 
}
