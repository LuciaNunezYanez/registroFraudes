import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumerosService } from 'src/app/services/numeros.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  formaNumero: FormGroup;
  numeros = [];

  constructor(private _numeros: NumerosService, private _login: UsuariosService, private fb: FormBuilder, private router: Router) {
    this.inicializarForma();
  }

  inicializarForma(){
    this.formaNumero = this.fb.group({
      numero: ['', [Validators.required, Validators.minLength(4)]]
    });
    
    // Comprobar que se inició sesión
    if(this._login.leerID() === null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  buscar(){
    if(this.formaNumero.invalid){
      Swal.fire({
        icon: 'error', 
        text: 'Ingrese un número válido de al menos 4 caracteres',
        showConfirmButton: false
      });
      return;
    }

    this._numeros.buscarNumero(this.formaNumero.get('numero').value).subscribe((results: any)=>{
      console.log(results.numeros);
      this.numeros = results.numeros;

      if(results.numeros.length == 0){
        Swal.fire({
          icon: 'info', 
          text: 'Ningún número coincide con su búsqueda',
          showConfirmButton: false
        });
      }
    });
  }

}
