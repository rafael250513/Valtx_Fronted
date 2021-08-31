import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  private API_SERVER="http://localhost:8080/sucursales/"

  constructor(private http: HttpClient) { }

  public getAllSucursales():Observable<any>{
    return this.http.get(this.API_SERVER);
  }

  public saveSucursales(sucursal:any):Observable<any>{
    return this.http.post(this.API_SERVER,sucursal);
  }

  public deleteSucursal(cod_sucursal):Observable<any>{
    return this.http.delete(this.API_SERVER + "delete/"+cod_sucursal);
  }

}
