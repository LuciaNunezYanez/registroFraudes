import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NumerosService } from 'src/app/services/numeros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  formaNumero: FormGroup;
  numeros = [];

  constructor(private _numeros: NumerosService, private fb: FormBuilder) {
    this.inicializarForma();
  }

  inicializarForma(){
    this.formaNumero = this.fb.group({
      numero: ['', [Validators.required, Validators.minLength(4)]]
    });
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
