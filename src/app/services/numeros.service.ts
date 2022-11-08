import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NumerosService {

  url = environment.url;

  constructor(private _http: HttpClient, private _login: LoginService) { }

  agregarNumero(data: any){
    data.usuario = this._login.leerID();
    if(this._login.leerID().length >= 1){
      return this._http.post(`${this.url}/api/numeros/agregar`, data );
    }
  }

}
