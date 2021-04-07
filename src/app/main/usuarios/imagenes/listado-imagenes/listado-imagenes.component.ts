import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from 'app/main/actividades/tbl-actividades/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface dato {id:string};
@Component({
  selector: 'app-listado-imagenes',
  templateUrl: './listado-imagenes.component.html',
  styleUrls: ['./listado-imagenes.component.scss']
})
export class ListadoImagenesComponent implements OnInit {
  public imagenesList = [];
  desdeFecha:string;
  hastaFecha:string;
  private _url = 'http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarArchivo/'+this.datex.id;
  
  constructor(@Inject (MAT_DIALOG_DATA) public datex:dato,private dialog:MatDialog,public json: ServiciosService) { console.log(this.datex.id) }

  ngOnInit() {
    
    this.json.getJson(this._url).subscribe((res:any) => {
     this.imagenesList = [];
     res.forEach((res2: any) => {
       
        this.imagenesList.push({
           
          id: res2.id_archivo,
          data: res2,
        });
          
      // this.dataSource= new MatTableDataSource(this.actividadesList)
       
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
 


     this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarArchivoFecha/'+this.datex.id.substring(0,4)+"/"+desdeFinal+"/"+hastaFinal).subscribe((res:any) => {
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

   onNavigate(url:string){ 
    window.open(url, "_blank"); 
  } 

}
