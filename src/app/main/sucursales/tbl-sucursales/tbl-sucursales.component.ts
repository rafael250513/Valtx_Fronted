import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
//services
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SucursalServiceService } from 'app/main/controller/sucursal-service.service';
import { UsuarioServiceService } from 'app/main/controller/usuario-service.service';
import { ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tbl-sucursales',
  templateUrl: './tbl-sucursales.component.html',
  styleUrls: ['./tbl-sucursales.component.scss']
})
export class TblSucursalesComponent implements OnInit {

  displayedColumns: string[] = ['cod_sucursal', 'Nombre', 'Editar','Eliminar'];
  dataSource: MatTableDataSource<any>
  public sucursalesList = [];
  sucursales: any;
  sucursalForm: FormGroup;

  constructor(public fb: FormBuilder,
    public sucursalService: SucursalServiceService,
    public usuarioService: UsuarioServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sucursalForm = this.fb.group({
      cod_sucursal: ['',Validators.required],
      nombre: ['',Validators.required],
    })

    this.listarSucursales();


  }

  listarSucursales(){

    this.sucursalService.getAllSucursales().subscribe((res:any) => {
      this.sucursalesList = [];
      res.forEach((res2: any) => {
        
            this.sucursalesList.push({
              id: res2.cod_usuario,
              data: res2,
            });
        this.dataSource= new MatTableDataSource(this.sucursalesList)
      //  console.log(this.usuariosList)
      })
      });
  }

  guardar(): void {
    this.sucursalService.saveSucursales(this.sucursalForm.value).subscribe(resp => {
    this.sucursalForm.reset();
    this.listarSucursales();
    },
      error => (console.error(error))
    )
  }

  eliminar(cod_sucursal){
    this.sucursalService.deleteSucursal(cod_sucursal).subscribe(resp=>{
      if(resp===true){
        this.listarSucursales();
      }
    })
  }

  editar(sucursal){
    this.sucursalForm.setValue({
      cod_sucursal:sucursal.data.cod_sucursal,
      nombre: sucursal.data.nombre ,
    })
  }

}
