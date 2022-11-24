import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NumerosService } from '../../services/numeros.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formaRegistro: FormGroup;
  id: number;
  nombre_usuario: string;

  entidades = [
    { id: 10, nombre: 'Durango' },
  ];

  municipios = [
    { id: 1, municipio: 'Canatlán' },
    { id: 2, municipio: 'Canelas' },
    { id: 3, municipio: 'Coneto de Comonfort' },
    { id: 4, municipio: 'Cuencamé' },
    { id: 5, municipio: 'Durango' },
    { id: 6, municipio: 'General Simón Bolívar' },
    { id: 7, municipio: 'Gómez Palacio' },
    { id: 8, municipio: 'Guadalupe Victoria' },
    { id: 9, municipio: 'Guanaceví' },
    { id: 10, municipio: 'Hidalgo' },
    { id: 11, municipio: 'Indé' },
    { id: 12, municipio: 'Lerdo' },
    { id: 13, municipio: 'Mapimí' },
    { id: 14, municipio: 'Mezquital' },
    { id: 15, municipio: 'Nazas' },
    { id: 16, municipio: 'Nombre de Dios' },
    { id: 17, municipio: 'Ocampo' },
    { id: 18, municipio: 'El Oro' },
    { id: 19, municipio: 'Otáez' },
    { id: 20, municipio: 'Pánuco de Coronado' },
    { id: 21, municipio: 'Peñón Blanco' },
    { id: 22, municipio: 'Poanas' },
    { id: 23, municipio: 'Pueblo Nuevo' },
    { id: 24, municipio: 'Rodeo' },
    { id: 25, municipio: 'San Bernardo' },
    { id: 26, municipio: 'San Dimas' },
    { id: 27, municipio: 'San Juan de Guadalupe' },
    { id: 28, municipio: 'San Juan del Río' },
    { id: 29, municipio: 'San Luis del Cordero' },
    { id: 30, municipio: 'San Pedro del Gallo' },
    { id: 31, municipio: 'Santa Clara' },
    { id: 32, municipio: 'Santiago Papasquiaro' },
    { id: 33, municipio: 'Súchil' },
    { id: 34, municipio: 'Tamazula' },
    { id: 35, municipio: 'Tepehuanes' },
    { id: 36, municipio: 'Tlahualilo' },
    { id: 37, municipio: 'Topia' },
    { id: 38, municipio: 'Vicente Guerrero' },
    { id: 39, municipio: 'Nuevo Ideal' },
  ];

  identidades = [
    { id: -1, identidad: 'No especificó' },
    { id: 0, identidad: 'Otro' },
    { id: 1, identidad: 'Familiar' },
    { id: 2, identidad: 'Miembro del crimer organizado' },
    { id: 3, identidad: 'Secuestrador' },
    { id: 4, identidad: 'Empleado de una institución bancaria' },
    { id: 5, identidad: 'Cobrador/empleado de tienda departamental' },
    { id: 6, identidad: 'Cobrador/ejecutivo de un prestador de servicios' },
    { id: 7, identidad: 'Servicio de paqueteria' },
    { id: 8, identidad: 'Conocido' },
    { id: 9, identidad: 'Autoridad de Seguridad Pública' },
    { id: 10, identidad: 'Funcionario público' },
    { id: 11, identidad: 'Compañero, conocido de un familiar, conocido del jefe' },
    { id: 12, identidad: 'Vendedor' },
    { id: 13, identidad: 'Intimidador' },
    { id: 14, identidad: 'Comprador de un bien ofrecido por la victima' },
    { id: 15, identidad: 'Empleado de fundaciones o instituciones filantrópicas internacionales' },
  ];

  extorsiones = [
    { id: 0, extorsion: 'Otros' },
    { id: 1, extorsion: 'Sorteos o premios' },
    { id: 2, extorsion: 'Apoyo ante una situación de emergencia' },
    { id: 3, extorsion: 'Derecho de piso vía telefónica' },
    { id: 4, extorsion: 'Amenaza de daño fisico o muerte' },
    { id: 5, extorsion: 'Amenaza de daño a bienes' },
    { id: 6, extorsion: 'Secuestro virtual' },
    { id: 7, extorsion: 'Obtención de datos' },
    { id: 8, extorsion: 'Cobro de adeudos' },
    { id: 9, extorsion: 'Cobro de adeudos con violencia' },
    { id: 10, extorsion: 'Autoridad exigiendo dinero' },
    { id: 11, extorsion: 'Solicitud de donativos' },
    { id: 12, extorsion: 'Amenaza por infidelidad' },
    { id: 13, extorsion: 'Estafa por venta' },
    { id: 14, extorsion: 'Estafa por la entrega de un bien' },
    { id: 15, extorsion: 'Violentar la privacidad o confidencialidad de información' },
    { id: 100, extorsion: '	Desconocida' },
  ];


  constructor(public fb: FormBuilder, private _registro: NumerosService, private _login: UsuariosService, private router: Router) {
    this.inicializarForma();
    this.id = Number.parseInt(this._login.leerID());
    this.nombre_usuario = this._login.leerUsuario();

    // Comprobar que se inició sesión
    if(this._login.leerID() === null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  inicializarForma() {
    this.formaRegistro = this.fb.group({
      telefono: ['', Validators.required],
      entidad: [10],
      municipio: [null, Validators.required],
      identidad: [null, Validators.required],
      extorsion: [null, Validators.required],
      extorsionotro: ['']
    });
  }

  reiniciarForma(){
    this.formaRegistro.reset({
      telefono: '',
      entidad: 10,
      // municipio: 1000,
      // identidad: 0,
      // extorsion: 0, 
      extorsionotro: ''
    });
  }

  reiniciar(){
    this.reiniciarForma();
  }


  registrarSL(){
    if(this._login.leerID() != null){
      if(this.formaRegistro.invalid){
        Swal.fire({
          text: 'Formulario incompleto', 
          icon: 'error',
          showConfirmButton: false
        });
        // console.log(this.formaRegistro.value);
      } else{
        // Realizar registro
        Swal.fire({
          text: 'Registrando', 
          icon: 'warning',
          showConfirmButton: false
        });
  
        this._registro.agregarNumero(this.formaRegistro.value).subscribe((res: any)=>{
          Swal.close();
          // console.log(res);
          Swal.fire({
            icon: (res.ok)? 'success': 'error',
            title: res.telefono,
            text: res.mensaje,
            showConfirmButton: false
          });
          if(res.ok)
            this.formaRegistro.controls['telefono'].setValue('');
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Inicie sesión para continuar',
        showConfirmButton: false
      });
      this.router.navigate(['/login']);
    }
  }

  registrar(){
    if(this._login.leerID() != null){
      if(this.formaRegistro.invalid){
        Swal.fire({
          text: 'Formulario incompleto', 
          icon: 'error',
          showConfirmButton: false
        });
        // console.log(this.formaRegistro.value);
      } else{
        // Realizar registro
        Swal.fire({
          text: 'Registrando', 
          icon: 'warning',
          showConfirmButton: false
        });
  
        this._registro.agregarNumero(this.formaRegistro.value).subscribe((res: any)=>{
          Swal.close();
          // console.log(res);
          Swal.fire({
            icon: (res.ok)? 'success': 'error',
            title: res.telefono,
            text: res.mensaje,
            showConfirmButton: false
          });
          if(res.ok)
            this.reiniciar();
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Inicie sesión para continuar',
        showConfirmButton: false
      });
      this.router.navigate(['/login']);
    }

  }

  cerrarSesion(){
    this._login.cerrarSesion();
    this.router.navigate(['/login']);
  }
}