import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
//services
//import { Usuarios } from '../../services/Usuarios.service';
import {Validators,FormGroup,FormControl} from '@angular/forms'
import { PopupRegistroActividadComponent } from '../popup-registro-actividad/popup-registro-actividad.component';
import { MatDialog } from '@angular/material/dialog';

//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import {AngularFireDatabase} from 'angularfire2/database'
//import {MatDialog,MatDialogConfig}from "@angular/material"
//import { DetalleSolicitudComponent } from '../../pasajeros/detalle-solicitud/detalle-solicitud.component';
//import { PopupMensajePasajeroComponent } from '../../pasajeros/popup-mensaje-pasajero/popup-mensaje-pasajero.component';
//import{PopupMensajeAprovedComponent} from '../popup-mensaje-aproved/popup-mensaje-aproved.component'
@Component({
  selector: 'app-listado-actividades',
  templateUrl: './listado-actividades.component.html',
  styleUrls: ['./listado-actividades.component.scss']
})
export class ListadoActividadesComponent implements OnInit {

 // pasajerosList: Pasajero[];
 public pasajeroList = [];
id:string='';
  constructor(//private  service: Usuarios,
    //private firestoreService:AngularFirestore,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute
     ) {

  }
 
  ngOnInit() {
  
    /*this.service.getPasajeros().subscribe((catsSnapshot) => {
     
      this.pasajeroList = [];
      catsSnapshot.forEach((psjData: any) => {
        
          this.pasajeroList.push({
            id: psjData.payload.doc.id,
            data: psjData.payload.doc.data(),
          });
        
      })
    });*/
  }

  oncreateSolicitud(codigo:any[]){

   /* this.dialog.open(DetalleSolicitudComponent,
      {
        data:{id:codigo}
    });*/
  }

  oncreateMensajePsj(){

  //  this.dialog.open(PopupMensajePasajeroComponent);
  }

  onRegistro(){

     this.dialog.open(PopupRegistroActividadComponent);
    }

  
  oncreateMensajeAproved(){

   // this.dialog.open(PopupMensajeAprovedComponent);
  }
}
