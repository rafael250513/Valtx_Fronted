import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoActividadesComponent } from './main/actividades/listado-actividades/listado-actividades.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TblActividadesComponent } from './main/actividades/tbl-actividades/tbl-actividades.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListadoMarcacionesComponent } from './main/marcaciones/listado-marcaciones/listado-marcaciones.component';
import { TblMarcacionesComponent } from './main/marcaciones/tbl-marcaciones/tbl-marcaciones.component';
import { MensajeUsernameComponent } from './main/login/mensaje-username/mensaje-username.component';
import { MensajePasswordComponent } from './main/login/mensaje-password/mensaje-password.component';
import { PopupRegistroActividadComponent } from './main/actividades/popup-registro-actividad/popup-registro-actividad.component';
import { ListadoUsuariosComponent } from './main/usuarios/listado-usuarios/listado-usuarios.component';
import { TblUsuariosComponent } from './main/usuarios/tbl-usuarios/tbl-usuarios.component';
import { ListadoImagenesComponent } from './main/usuarios/imagenes/listado-imagenes/listado-imagenes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SampleComponent } from './main/sample/sample.component';


const routes: Routes = [];

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'mensaje-password',
        component: MensajePasswordComponent
    },
    {
        path: 'mensaje-username',
        component: MensajeUsernameComponent
    },
    {
        path: 'listado-usuarios',
        component: ListadoUsuariosComponent
    },
    {
        path: 'tbl-usuarios',
        component: TblUsuariosComponent
    },
    {
        path: 'listado-actividades',
        component: ListadoActividadesComponent
    },
    {
        path: 'tbl-actividades',
        component: TblActividadesComponent
    },
    {
        path: 'listado-marcaciones',
        component: ListadoMarcacionesComponent
    },
    {
        path: 'tbl-marcaciones',
        component: TblMarcacionesComponent
    },
    {
        path: 'popup-registro-actividad',
        component: PopupRegistroActividadComponent
    },
    // {
    //     path        :'sample/:id',
    //     component   : SampleComponent
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: '**',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        AppComponent, LoginComponent, ListadoActividadesComponent, TblActividadesComponent, ListadoMarcacionesComponent, TblMarcacionesComponent, MensajeUsernameComponent, MensajePasswordComponent, PopupRegistroActividadComponent, ListadoUsuariosComponent, TblUsuariosComponent, ListadoImagenesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        MatButtonModule,
        MatFormFieldModule,

        MatInputModule,
        MatCheckboxModule,
        MatRippleModule,
        // MatTableDataSource,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        // App modules
        LayoutModule,
        SampleModule,
        BrowserModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatToolbarModule,
        //MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        // MatSnackBarModule,
        // MatTableModule,
        MatIconModule,
        // MatPaginatorModule,
        // MatSortModule,
        //MatTableDataSource
        BrowserModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSelectModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
