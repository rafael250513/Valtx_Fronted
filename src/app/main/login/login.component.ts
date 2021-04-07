import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ServiciosService } from '../actividades/tbl-actividades/servicios.service';
import{Router} from '@angular/router';
import { MensajePasswordComponent } from './mensaje-password/mensaje-password.component';
import { MensajeUsernameComponent } from './mensaje-username/mensaje-username.component';
export interface dato {id:string};
@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
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
        // Configure the layout
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
          //  email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

/*
    login(usuario:string,pass:string){
        this.json.getJson('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/listarPersonalxDependencia/0016').subscribe((res:any) => {
     this.usuariosList = res;
     res.forEach((res2: any) => {
        this.usuariosList.push({
            //id: res2.id_usuario,
            data: res2,
          });
       
         console.log( this.usuariosList) ;
     });
    });
    }*/

    login(usuario:string,pass:string){
       // console.log('login');
    this.json.getJson_post('http://test-wi-rwm.saludpol.gob.pe:7081/monitoreo/login/'+usuario+'/'+pass,
    {
        text:'Este es el comentario '
    }
    ).subscribe((res:any)=>{
       // this.usuariosList = res;
       console.log(res);
        if(res.mensaje=="Correcto."){
       this.grabar_localstorage(res.id_perfil,res.vc_nombre);
       this.router.navigate(['/listado-actividades']);
        }
        else {
            this.dialog.open(MensajeUsernameComponent);
        }

       
    });
   
    }
/*
  login(usuario:string,pass:string){
        this.json.getJson('http://localhost:3000/usuario').subscribe((res:any) => {
     this.usuariosList = res;
     let contador2=0;
     let contador3=0;
     let contador4=0;
     res.forEach((res2: any) => {
        this.usuariosList.push({
            id: res2.codi_empl_per,
            data: res2,
          });
       
            if(res2.vc_nombre==usuario && res2.password==pass){
                contador2++;
                if(contador2==1){ 
                    this.idUsuario=res2.codi_empl_per;
                  
                }
               
            }  
            if(res2.vc_nombre==usuario && res2.password!=pass){
                contador3++;
            }
     })
    // alert("22 "+this.idUsuario);
     if(contador2==1){
        this.grabar_localstorage(this.idUsuario);
        this.router.navigate(['/listado-actividades']);
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
*/
    grabar_localstorage(idPerfil:string,usuario:string){
        localStorage.setItem("idPerfil",idPerfil);
        localStorage.setItem("usuario",usuario);
    }

    
    
}
