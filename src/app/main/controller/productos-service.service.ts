import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {
  private API_SERVER="http://localhost:8080/productos/"
  constructor(private http: HttpClient) { }

  public getAllProductos():Observable<any>{
    return this.http.get(this.API_SERVER);
  }

  public saveProductos(producto:any):Observable<any>{
    return this.http.post(this.API_SERVER,producto);
  }

  public deleteProducto(cod_producto):Observable<any>{
    return this.http.delete(this.API_SERVER + "delete/"+cod_producto);
  }
}
