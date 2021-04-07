import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from 'app/main/actividades/tbl-actividades/servicios.service';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tbl-marcaciones',
  templateUrl: './tbl-marcaciones.component.html',
  styleUrls: ['./tbl-marcaciones.component.scss']
})
export class TblMarcacionesComponent implements OnInit {
  public marcacionesList = [];
  public usuariosList = [];
  public idUsuarioMar:string;
  displayedColumns: string[] = ['id_marcacion','tipoMarcacion', 'fechaMarcacion'];
  dataSource:MatTableDataSource<any>
  public dependenciasList = [];
  currentDependencia: string;
  currentUsuario: string;
  desdeFecha:string;
  hastaFecha:string;
  showme1:boolean=true;
  showme2:boolean=true;
  public listUserIdMarcacion:Array<any>=[]

  @Input() usuarioMarcacion:string;

  constructor(public json: ServiciosService,private configAlert:NgbAlertConfig) { }

  ngOnInit() {
    let idPerfil=localStorage.getItem("idPerfil");
    let usuario=localStorage.getItem("usuario");
    let codigoEmpleadoMar=localStorage.getItem("codigoEmpleado");
    let codDependenciaMar=localStorage.getItem("codDependencia");
    console.log("idPerfil Marcacion "+idPerfil);
    console.log("usuario Marcacion "+usuario);
    console.log("codigoEmpleadoMar Marcacion "+codigoEmpleadoMar);
    console.log("codDependenciaMar Marcacion "+codDependenciaMar);
    if(idPerfil=="1"){
      console.log("Marcacion 1 ")
      this.showme1=true;
      this.showme2=true;
      //document.getElementById("uno").style.visibility = 'visible';
      //document.getElementById("dos").style.visibility = 'visible';
     // document.getElementById("uno").style.display="";
      //document.getElementById("dos").style.display="";
      this.listarDependencias();
    }
    else if(idPerfil=="2"){
      console.log("Marcacion 2 ")
      this.showme1=false;
      this.showme2=true;
     // document.getElementById("uno").style.visibility = 'hidden';
      //document.getElementById("dos").style.visibility = 'visible';
     // document.getElementById("uno").style.display="none";
     // document.getElementById("dos").style.display="";
      this.listarPersonalDependencia(codDependenciaMar);
    }
    else if(idPerfil=="3"){
      console.log("Marcacion 3 ")
      this.showme1=false;
      this.showme2=false;
      //document.getElementById("uno").style.visibility = 'hidden';
      //document.getElementById("dos").style.visibility = 'hidden';
      //document.getElementById("uno").style.display="none";
      //document.getElementById("dos").style.display="none";
      this.currentUsuario=codigoEmpleadoMar;
    }
     
/****************************************************************************************************************************************** */

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
      console.log(this.usuariosList)
      });
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
 console.log("usuario2 "+ this.currentUsuario)
   

     this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/marcacionFecha/'+this.currentUsuario.substring(0,4)+"/"+desdeFinal+"/"+hastaFinal).subscribe((res:any) => {
      this.marcacionesList = [];
      res.forEach((res2: any) => {
        
            this.marcacionesList.push({
              id: res2.id_actividad,
              data: res2,
              
            });
 
        this.dataSource= new MatTableDataSource(this.marcacionesList)
        
      })
      console.log(this.marcacionesList)
      });
 
    }
   //http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/marcacionFecha/0732/19-02-2021/25-02-2021
  
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
