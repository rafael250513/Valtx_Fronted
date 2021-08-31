import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ServiciosService } from '../controller/servicios.service';
import{Router} from '@angular/router';

import { MensajePasswordComponent } from './mensaje-password.component';
import { MensajeUsernameComponent } from './mensaje-username.component';
export interface dato {id:string};
@Component({
    selector     : 'login',
    templateUrl  : '../view/login.component.html',
    styleUrls    : ['../view/login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */

    idcontador:number;
    public valLog = [];
    contador:number;
    public paymentsList = [];
    public validacion=[];
    public documentId :string;
    public idCond:string;
    public idUsuario:string="07777";
  public currentStatus = 1;
  public usuariosList = [];
    contador2: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public json: ServiciosService,
        private router:Router,
        private dialog:MatDialog
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

   
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            password: ['', Validators.required]
        });
    }


  login(usuario:string,pass:string){
        this.json.getJson('http://localhost:8080/usuarios/').subscribe((res:any) => {
     this.usuariosList = res;
     let contador2=0;
     let contador3=0;
     let contador4=0;
     res.forEach((res2: any) => {
        this.usuariosList.push({
            id: res2.cod_usuario,
            data: res2,
          });
       
            if(res2.users==usuario && res2.password==pass){
                contador2++;
                if(contador2==1){ 
                    this.idUsuario=res2.cod_usuario;
                  
                }
               
            }  
            if(res2.users==usuario && res2.password!=pass){
                contador3++;
            }
     })
     if(contador2==1){
        this.router.navigate(['/principal-usuarios']);
    }  
    else{
        if(contador3>0 && contador4==0){
            this.dialog.open(MensajePasswordComponent);
           }
           else if(contador3==0){
            this.dialog.open(MensajeUsernameComponent);
           }
    }
       });

    }

 

    
    
}
