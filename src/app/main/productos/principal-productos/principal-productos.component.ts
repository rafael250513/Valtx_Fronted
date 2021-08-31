import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {Validators,FormGroup,FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-principal-productos',
  templateUrl: './principal-productos.component.html',
  styleUrls: ['./principal-productos.component.scss']
})
export class PrincipalProductosComponent implements OnInit {

  id:string='';

  constructor(private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onRegistro(){
 
    }
 

}
