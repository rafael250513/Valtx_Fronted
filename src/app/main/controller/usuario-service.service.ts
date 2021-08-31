import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private API_SERVER="http://localhost:8080/usuarios/"

  constructor(private http: HttpClient) { }

  public getAllUsuarios():Observable<any>{
    return this.http.get(this.API_SERVER);
  }

  public saveUsuarios(usuario:any):Observable<any>{
    return this.http.post(this.API_SERVER,usuario);
  }

  public deleteUsuario(cod_usuario):Observable<any>{
    return this.http.delete(this.API_SERVER + "delete/"+cod_usuario);
  }

}
