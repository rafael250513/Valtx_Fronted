import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from 'app/main/actividades/tbl-actividades/servicios.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeUsernameComponent } from 'app/main/login/mensaje-username/mensaje-username.component';
import { ListadoImagenesComponent } from '../imagenes/listado-imagenes/listado-imagenes.component';
export interface dato {id:string};

@Component({
  selector: 'app-tbl-usuarios',
  templateUrl: './tbl-usuarios.component.html',
  styleUrls: ['./tbl-usuarios.component.scss']
})
export class TblUsuariosComponent implements OnInit {
  public usuariosList = [];
  public dependenciasList = [];
  public listFinal = [];
  public imagenesList=[];
  currentDependencia: string;
  displayedColumns: string[] = ['vc_nombre', 'nom_emp_per', 'ape_pat_per','ape_mat_per','imag'];
  dataSource:MatTableDataSource<any>
  idPerfil:string;
  usuario:string;
  codigoEmpleadoMar:string;
   codDependenciaMar:string;
   desdeFecha:string;
  hastaFecha:string;
  showme1:boolean=true;
  showme2:boolean=true;
  showme3:boolean=true;
    
  constructor(public json: ServiciosService,private dialog:MatDialog) { }

  ngOnInit() {

    this.idPerfil=localStorage.getItem("idPerfil");
    this.usuario=localStorage.getItem("usuario");
    this.codigoEmpleadoMar=localStorage.getItem("codigoEmpleado");
    this.codDependenciaMar=localStorage.getItem("codDependencia");
    console.log("idPerfil USUARIOS "+this.idPerfil);
    console.log("usuario USUARIOS "+this.usuario);
    console.log("codigoEmpleadoMar USUARIOS "+this.codigoEmpleadoMar);
    console.log("codDependenciaMar USUARIOS "+this.codDependenciaMar);

    if(this.idPerfil=="1"){
      console.log("USUARIOS 1 ")
      this.showme1=true;
      this.showme2=true;
      this.showme3=false;
      /*document.getElementById("uno").style.display="";
      document.getElementById("principal1_2").style.display="";
      document.getElementById("principal1_3").style.display="";
      document.getElementById("principal2_1").style.display="none";
      document.getElementById("principal2_2").style.display="none";
      document.getElementById("principal2_3").style.display="none";*/
      this.listarDependencias();
      this.primera_busqueda('0047');
    }
    else if(this.idPerfil=="2"){
      console.log("USUARIOS 2 ")
      this.showme1=false;
      this.showme2=true;
      this.showme3=false;
     /* document.getElementById("uno").style.display="none";
      document.getElementById("principal1_2").style.display="";
      document.getElementById("principal1_3").style.display="";
      document.getElementById("principal2_1").style.display="none";
      document.getElementById("principal2_2").style.display="none";
      document.getElementById("principal2_3").style.display="none";*/
      this.primera_busqueda(this.codDependenciaMar);
    }
    else if(this.idPerfil=="3"){
      console.log("USUARIOS 3 ")
      this.showme1=false;
      this.showme2=false;
      this.showme3=true;
     /* document.getElementById("uno").style.display="none";
      document.getElementById("principal1_2").style.display="none";
      document.getElementById("principal1_3").style.display="none";
      document.getElementById("principal2_1").style.display="";
      document.getElementById("principal2_2").style.display="";
      document.getElementById("principal2_3").style.display="";*/
      let _url = 'http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarArchivo/'+this.codigoEmpleadoMar;
      this.primera_busqueda_img(_url);
    }
  /*  else if(idPerfil=="3"){
      document.getElementById("uno").style.display="none";
      document.getElementById("dos").style.display="none";
      this.currentUsuario=codigoEmpleadoMar;
    }*/

   }

   onNavigate(url:string){ 
    window.open(url, "_blank"); 
  } 

   primera_busqueda_img(url_:string){
    this.json.getJson(url_).subscribe((res:any) => {
      this.imagenesList = [];
      res.forEach((res2: any) => {
        
         this.imagenesList.push({
            
           id: res2.id_archivo,
           data: res2,
         });
      })
      console.log(this.imagenesList)
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
 


     this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarArchivoFecha/'+this.codigoEmpleadoMar+"/"+desdeFinal+"/"+hastaFinal).subscribe((res:any) => {
      this.imagenesList = [];
      res.forEach((res2: any) => {
        
            this.imagenesList.push({
              id: res2.id_marcacion,
              data: res2,
            });
      })
      console.log(this.imagenesList)
      });
 
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

   primera_busqueda(dependencia:string){
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
      console.log(this.usuariosList)
      });
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

   oncreateSolicitud(codigo:any[]){

    this.dialog.open(ListadoImagenesComponent,
      {
        data:{id:codigo}
    });
  }

}
