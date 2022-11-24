import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  url = environment.url;

  constructor(private _http: HttpClient) { }


  getEstadisticaFecha(fecha1: string, fecha2: string){
    return this._http.get(`${this.url}/estadistica/${fecha1}/${fecha2}`);
  }
  
  getEstadisticaOperador(fecha1: string, fecha2: string, operador: Number){
    return this._http.get(`${this.url}/estadistica/${fecha1}/${fecha2}/${operador}`);
  }
}
