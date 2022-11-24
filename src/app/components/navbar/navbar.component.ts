import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombre_usuario;
  tipo_usuario;

  constructor(private _login: UsuariosService, private router: Router) {
    this.nombre_usuario = this._login.leerUsuario();
    this.tipo_usuario = this._login.leerTipo();
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._login.cerrarSesion();
  }

}
