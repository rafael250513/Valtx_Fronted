
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
//services
//import { Usuarios } from '../../services/Usuarios.service';
import {Validators,FormGroup,FormControl} from '@angular/forms'
import { PopupRegistroUsuarioComponent } from '../popup-registro-usuario/popup-registro-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-principal-usuarios',
  templateUrl: './principal-usuarios.component.html',
  styleUrls: ['./principal-usuarios.component.scss']
})
export class PrincipalUsuariosComponent implements OnInit {
  
  id:string='';

  constructor(private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

   
 
   onRegistro(){
 
      this.dialog.open(PopupRegistroUsuarioComponent);
     }
 
   
  

}
