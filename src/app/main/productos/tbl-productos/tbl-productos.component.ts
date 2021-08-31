import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
//services
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SucursalServiceService } from 'app/main/controller/sucursal-service.service';
import { UsuarioServiceService } from 'app/main/controller/usuario-service.service';
import { ProductosServiceService } from 'app/main/controller/productos-service.service';
import { ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tbl-productos',
  templateUrl: './tbl-productos.component.html',
  styleUrls: ['./tbl-productos.component.scss']
})
export class TblProductosComponent implements OnInit {

  displayedColumns: string[] = ['cod_producto', 'Nombre','Precio', 'Editar','Eliminar'];
  dataSource: MatTableDataSource<any>
  public productosList = [];
  productos: any;
  productoForm: FormGroup;

  constructor(public fb: FormBuilder,
    public sucursalService: SucursalServiceService,
    public usuarioService: UsuarioServiceService,
    public productoService: ProductosServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productoForm = this.fb.group({
      cod_producto: ['',Validators.required],
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
    })

    this.listarProductos();
  }

  listarProductos(){

    this.productoService.getAllProductos().subscribe((res:any) => {
      this.productosList = [];
      res.forEach((res2: any) => {
        
            this.productosList.push({
              id: res2.cod_producto,
              data: res2,
            });
        this.dataSource= new MatTableDataSource(this.productosList)
     
      })
      });
  }

  guardar(): void {
    this.productoService.saveProductos(this.productoForm.value).subscribe(resp => {
    this.productoForm.reset();
    this.listarProductos();
    },
      error => (console.error(error))
    )
  }

  eliminar(cod_producto){
    this.productoService.deleteProducto(cod_producto).subscribe(resp=>{
     // console.log(resp)
      
    this.listarProductos();
    })
  }

  editar(producto){
    this.productoForm.setValue({
      cod_producto:producto.data.cod_producto,
      nombre: producto.data.nombre ,
      precio: producto.data.precio ,
    })
  }

}
