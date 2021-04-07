import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
//services
//import { Usuarios } from '../../services/Usuarios.service';
import {Validators,FormGroup,FormControl} from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ServiciosService} from './servicios.service';
import { ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';


//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import {AngularFireDatabase} from 'angularfire2/database'
//import {MatDialog,MatDialogConfig,MatTableDataSource}from "@angular/material"
//import { DetalleSolicitudComponent } from '../../pasajeros/detalle-solicitud/detalle-solicitud.component';
//import { PopupMensajePasajeroComponent } from '../../pasajeros/popup-mensaje-pasajero/popup-mensaje-pasajero.component';
//import{PopupMensajeAprovedComponent} from '../popup-mensaje-aproved/popup-mensaje-aproved.component'
//import { PopupBloqueoComponent } from '../popup-bloqueo/popup-bloqueo.component';
@Component({
  selector: 'app-tbl-actividades',
  templateUrl: './tbl-actividades.component.html',
  styleUrls: ['./tbl-actividades.component.scss']
})
export class TblActividadesComponent implements OnInit {
  public actividadesList = [];
  displayedColumns: string[] = ['id_actividad', 'descripcion', 'fechaActividad'];
  dataSource:MatTableDataSource<any>
  public dependenciasList = [];
  public dependenciasList2 = [];
  public usuariosList = [];
  currentDependencia: string;
  currentUsuario: string;
  currentUsuario_2:string;
  desdeFecha:string;
  hastaFecha:string;
  id='';
  codEmpleado='';
  codDependencia='';
  showme1:boolean=true;
  showme2:boolean=true;
  constructor(public json: ServiciosService, private route:ActivatedRoute
    //private  service: Usuarios,
   // private firestoreService:AngularFirestore,
    //private dialog:MatDialogModule
    ) { 
      //this.obtener_localStorage();

    }

  ngOnInit() {
    
    //this.id=this.route.snapshot.paramMap.get('id');
    //console.log("id "+this.id);
    //console.log("tama "+this.id.length);
    //aca
   
    let idPerfil=localStorage.getItem("idPerfil");
    let usuario=localStorage.getItem("usuario");
   
     
    console.log("idPerfil Actividad "+idPerfil);
    console.log("usuario Actividad "+usuario);
   
    this.obtener_codigo_usuario(usuario,idPerfil);
    if(idPerfil=="1"){
      console.log("Actividad 1 ")
      this.showme1=true;
      this.showme2=true;
      //document.getElementById("uno").style.display="";
      //document.getElementById("dos").style.display="";
      this.listarDependencias();
    }
    else if(idPerfil=="2"){
      console.log("Actividad 2 ")
      this.showme1=false;
      this.showme2=true;
      //document.getElementById("uno").style.display="none";
      //document.getElementById("dos").style.display="";
      
    }
    else if(idPerfil=="3"){
      console.log("Actividad 3 ")
      this.showme1=false;
      this.showme2=false;
      //document.getElementById("uno").style.display="none";
     // document.getElementById("dos").style.display="none";
    }
    
  
  }

  onSearchUsuarios(){

    let url='http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarPersonalxDependencia/'+this.currentDependencia;
    this.json.getJson(url).subscribe((res:any) => {
      this.usuariosList = [];
      res.forEach((res2: any) => {
        
            this.usuariosList.push({
              id: res2.codi_empl_per,
              data: res2,
            });
        this.dataSource= new MatTableDataSource(this.usuariosList)
        
      })
     // console.log(this.usuariosList)
      });
      console.log(this.currentUsuario_2)
  }

  onSearchFecha(desde:string,hasta:string){
   let diaDesde,mesDesde,anioDesde,desdeFinal;
   let diaHasta,mesHasta,anioHasta,hastaFinal;

   if(desde.length==8){
    mesDesde=desde.substring(0,1);
    diaDesde=desde.substring(2,3);
     anioDesde=desde.substring(4,8);
   
   }
   else if(desde.length==9){
    mesDesde=desde.substring(0,2);
     if(mesDesde.substring(1,2)=="/"){
      mesDesde=desde.substring(0,1);
      diaDesde=desde.substring(2,4);
       anioDesde=desde.substring(5,9);
     }
     else{
      mesDesde=desde.substring(0,2);
       diaDesde=desde.substring(3,4);
       anioDesde=desde.substring(5,9);
     }

   }
   else if(desde.length==10){
    mesDesde=desde.substring(0,2);
    diaDesde=desde.substring(3,5);
     anioDesde=desde.substring(6,10);
   }

   if(parseInt(diaDesde)<10){
     diaDesde="0"+diaDesde;
   }
   else{
     diaDesde=diaDesde;
   }

   if(parseInt(mesDesde)<10){
     mesDesde="0"+mesDesde;
   }
   else{
     mesDesde=mesDesde;
   }

   desdeFinal=diaDesde+"-"+mesDesde+"-"+anioDesde;
   console.log("desdeFinal ",desdeFinal);

/**************************************************************************** */

   if(hasta.length==8){
    mesHasta=hasta.substring(0,1);
     diaHasta=hasta.substring(2,3);
     anioHasta=hasta.substring(4,8);
   
   }
   else if(hasta.length==9){
    mesHasta=hasta.substring(0,2);
     if(mesHasta.substring(1,2)=="/"){
      mesHasta=hasta.substring(0,1);
      diaHasta=hasta.substring(2,4);
       anioHasta=hasta.substring(5,9);
     }
     else{
      mesHasta=hasta.substring(0,2);
       diaHasta=hasta.substring(3,4);
       anioHasta=hasta.substring(5,9);
     }

   }
   else if(hasta.length==10){
    mesHasta=hasta.substring(0,2);
    diaHasta=hasta.substring(3,5);
     anioHasta=hasta.substring(6,10);
   }

    if(parseInt(diaHasta)<10){
      diaHasta="0"+diaHasta;
    }
    else{
      diaHasta=diaHasta;
    }

    if(parseInt(mesHasta)<10){
      mesHasta="0"+mesHasta;
    }
    else{
      mesHasta=mesHasta;
    }

    hastaFinal=diaHasta+"-"+mesHasta+"-"+anioHasta;
    console.log("hastaFinal ",hastaFinal);

    /****************************************************************************************************************************************** */
   this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarActividadFecha/'+this.currentUsuario.substring(0,4)+"/"+desdeFinal+"/"+hastaFinal).subscribe((res:any) => {
    this.actividadesList = [];
    res.forEach((res2: any) => {
      
          this.actividadesList.push({
            id: res2.id_actividad,
            data: res2,
          });
      this.dataSource= new MatTableDataSource(this.actividadesList)
      
    })
    });
   }

   obtener_codigo_usuario(usuario2:string,id_perfil2:string){
    let arrayDependencias=[];
    let arrayEmpleado=[];
    let arrayDependencias2=[];
    let contador=0;
    let contador2=0;
    /****************************************************************************/
    this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarDependencias').subscribe((ress:any) => {
      ress.forEach((ress2: any) => {
        arrayDependencias.push(ress2.codi_depe_tde);
      });
      for(let i=0;i<arrayDependencias.length;i++){
         let url='http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarPersonalxDependencia/'+arrayDependencias[i];
         this.json.getJson(url).subscribe((res:any) => {
          res.forEach((res2: any) => {
          
            if(usuario2==res2.vc_nombre){
              this.grabar_localstorage2(res2.codi_empl_per,arrayDependencias[i]);
              arrayEmpleado.push(res2.codi_empl_per);
              arrayDependencias2.push(arrayDependencias[i]);
            }
          });
          if(arrayEmpleado.length>0  && arrayDependencias2.length>0 ){
            if(contador==0){
              console.log("Actividad codEmpleado "+arrayEmpleado[0]);
              console.log("Actividad codDependencia "+arrayDependencias2[0]);
              
              if(id_perfil2=='2'){
                this.listarPersonalDependencia(arrayDependencias2[0]);
              }
              else if(id_perfil2=='3'){
                this.currentUsuario=arrayEmpleado[0];
              }
              contador++;
            } 
          }
          
          });
        
       }
       
      });
     
   }
   grabar_localstorage2(codigoEmpleado:string,codDependencia:string){
    localStorage.setItem("codigoEmpleado",codigoEmpleado);
    localStorage.setItem("codDependencia",codDependencia);
  }

  listarDependencias(){
    this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarDependencias').subscribe((ress:any) => {
      this.dependenciasList = [];
      ress.forEach((ress2: any) => {
        
            this.dependenciasList.push({
              id: ress2.codi_depe_tde,
              data: ress2,
            });
      })
      
      });
  }
  listarPersonalDependencia(dependencia:string){
    let url='http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarPersonalxDependencia/'+dependencia;
      this.json.getJson(url).subscribe((res:any) => {
      this.usuariosList = [];
      res.forEach((res2: any) => {
        
            this.usuariosList.push({
              id: res2.codi_empl_per,
              data: res2,
            });
        this.dataSource= new MatTableDataSource(this.usuariosList)
        
      })
      });
  }
}

