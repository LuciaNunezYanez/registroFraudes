import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadisticaService } from 'src/app/services/estadistica.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  formaEstadistica: FormGroup;
  registros = [];
  operadores = [];

  constructor(private _estad: EstadisticaService, private _usuarios: UsuariosService, public fb: FormBuilder) {
    this.inicializarForma();
    _usuarios.getOperadores().subscribe((results: any)=>{
      this.operadores = results.operadores;
    });
  }  

  ngOnInit(): void {
  }
  
  inicializarForma(){
    this.formaEstadistica = this.fb.group({
      fecha1: [''],
      fecha2: [''],
      operador: [-1]
    });
  }

  reiniciarForma(){
    this.formaEstadistica.reset({
      fecha1: '', 
      fecha2: '', 
      operador: -1
    });
  }

  ver(){
    if(this.formaEstadistica.controls['fecha1'].value.length <= 0){
      Swal.fire({
        text: 'Seleccione al menos fecha de inicio', 
        icon: 'info',
        showConfirmButton: false
      });
      return;
    }

    // Si la fecha 2 está vacia, se le asigna el valor de la fecha 1
    if(this.formaEstadistica.controls['fecha2'].value.length == 0){
      this.formaEstadistica.controls['fecha2'].setValue(this.formaEstadistica.controls['fecha1'].value);
    }

    // Si operador es -1, se busca solo por fecha 
    // de lo contrario por fecha y operador.
    if(this.formaEstadistica.value.operador == -1 ){
      this._estad.getEstadisticaFecha(this.formaEstadistica.controls['fecha1'].value,this.formaEstadistica.get('fecha2').value).subscribe((results: any)=>{
        // console.log(results);
        this.registros = results.registros;
        if(results.registros.length == 0){
          Swal.fire({
            icon: 'warning',
            text: 'No se encontraron registros', 
            showConfirmButton: false
          });
        }
      });
    } else {
      this._estad.getEstadisticaOperador(this.formaEstadistica.controls['fecha1'].value,this.formaEstadistica.get('fecha2').value, this.formaEstadistica.get('operador').value).subscribe((results: any)=>{
        // console.log(results);
        this.registros = results.registros;
        if(results.registros.length == 0){
          Swal.fire({
            icon: 'warning',
            text: 'No se encontraron registros', 
            showConfirmButton: false
          });
        }
      });
    }


  }

}
