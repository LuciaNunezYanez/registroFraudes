import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.url;

  constructor(private _http: HttpClient) { }

  login(data: any){
    return this._http.post(`${this.url}/login/login`, data );
  }

  cerrarSesion() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
  }

  guardarSesion(id_usuario, usuario){
    localStorage.setItem('id', id_usuario);
    localStorage.setItem('usuario', usuario);
  }

  leerID(){
    return localStorage.getItem('id');
  }

  leerUsuario(){
    return localStorage.getItem('usuario');
  }
}
