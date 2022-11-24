import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = environment.url;

  constructor(private _http: HttpClient) { }

  // LOGIN 
  // LOGIN 
  // LOGIN 
  // LOGIN 

  login(data: any){
    return this._http.post(`${this.url}/login/login`, data );
  }

  cerrarSesion() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo');
  }

  guardarSesion(id_usuario, usuario, tipo){
    localStorage.setItem('id', id_usuario);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('tipo', tipo);
  }

  leerID(){
    return localStorage.getItem('id');
  }

  leerUsuario(){
    return localStorage.getItem('usuario');
  }

  leerTipo(){
    return localStorage.getItem('tipo');
  }

  // USUARIOS
  // USUARIOS
  // USUARIOS
  // USUARIOS

  getOperadores(){
    return this._http.get(`${this.url}/login/operadores`);
  }

}
