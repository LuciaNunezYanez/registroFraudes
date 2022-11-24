import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'estadistica', component: EstadisticaComponent },
  // { path: '**', component: NotfoundComponent },
  { path: '', component: LoginComponent },
  // { path: '', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
