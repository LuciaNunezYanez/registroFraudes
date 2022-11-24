import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registroFraudes';
  nombre_usuario;

  constructor(private _login: UsuariosService){
    
    this.nombre_usuario = this._login.leerUsuario();
  }
}
