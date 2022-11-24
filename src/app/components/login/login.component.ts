import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formaLogin: FormGroup;

  constructor(public fb: FormBuilder, private _login: UsuariosService, private router: Router) {
    this.inicializarForma();
  }

  ngOnInit(): void {
  }

  inicializarForma() {
    this.formaLogin = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  reiniciarForma() {
    this.formaLogin.reset({
      usuario: '',
      contrasena: ''
    });
  }

  comenzar() {
    if (this.formaLogin.invalid) {
      Swal.fire({
        text: 'Campos incompletos',
        icon: 'error',
        showConfirmButton: false
      });
    } else {
      this._login.login(this.formaLogin.value).subscribe((res: any) => {
        if (res.usuario.id_usuario != undefined) {
          // Guardar preferencias
          this._login.guardarSesion(res.usuario.id_usuario, res.usuario.nombre_usuario, res.usuario.tipo_usuario);
          this.router.navigate(['/registro']);
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Verifique sus credenciales',
            showConfirmButton: false
          });
        }
      });
    }

  }
}
