import { Injectable,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  @Output() disparadorFavoritos:EventEmitter<any> = new EventEmitter();
  @Output() disparadorFavoritos2:EventEmitter<any> = new EventEmitter();
  constructor( private http: HttpClient) { }

  getJson(url: string){
    return this.http.get(url);
  }

  getJson_post(url: string,body){
    return this.http.post(url,body);
  }

}
