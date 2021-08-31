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
  selector: 'app-tbl-usuarios',
  templateUrl: './tbl-usuarios.component.html',
  styleUrls: ['./tbl-usuarios.component.scss'],
})
export class TblUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['cod_usuario', 'Nombre', 'User','Editar','Eliminar'];
  dataSource: MatTableDataSource<any>
  public sucursalList = [];
  sucursales: any;
  usuarios: any;

  public usuariosList = [];
  currentSucursal: string;
  currentUsuario: string;
  usuarioForm: FormGroup;
  
  constructor(public fb: FormBuilder,
    public sucursalService: SucursalServiceService,
    public usuarioService: UsuarioServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      cod_usuario: ['',Validators.required],
      nombre: ['',Validators.required],
      users: ['',Validators.required],
      password: ['',Validators.required],
      sucursal: ['',Validators.required],
    })


    this.listarSucursales();
    this.listarUsuarios();

    

  }

  listarSucursales() {
    this.sucursalService.getAllSucursales().subscribe(resp => {
      this.sucursales = resp;

      //console.log(resp);
    },
      error => (console.error(error))
    )
  }

  listarUsuarios(){

    this.usuarioService.getAllUsuarios().subscribe((res:any) => {
      this.usuariosList = [];
      res.forEach((res2: any) => {
        
            this.usuariosList.push({
              id: res2.cod_usuario,
              data: res2,
            });
        this.dataSource= new MatTableDataSource(this.usuariosList)
      //  console.log(this.usuariosList)
      })
      });
  }

  guardar(): void {
    this.usuarioService.saveUsuarios(this.usuarioForm.value).subscribe(resp => {
    this.usuarioForm.reset();
    this.listarUsuarios();
    },
      error => (console.error(error))
    )
  }

  eliminar(cod_usuario){
    this.usuarioService.deleteUsuario(cod_usuario).subscribe(resp=>{
      if(resp===true){
        this.listarUsuarios();
      }
    })
  }

  editar(usuario){
    console.log(usuario.data.sucursal);
    this.usuarioForm.setValue({
      cod_usuario:usuario.data.cod_usuario,
      nombre: usuario.data.nombre ,
      users: usuario.data.users ,
      password: usuario.data.password,
     sucursal: usuario.data.sucursal,
    })
  }

  valor(sucursal){
console.log(sucursal);

  }


}
