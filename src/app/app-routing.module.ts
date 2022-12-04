import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SzemelyListaComponent } from './components/szemely-lista/szemely-lista.component';
import { BejelentkezesComponent } from "./components/login/bejelentkezes/bejelentkezes.component";
import { KezdolapComponent } from "./components/kezdolap/kezdolap.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {path: 'kezdolap', component: KezdolapComponent, canActivate: [AuthGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  //{path: 'szemelyek', component: SzemelyListaComponent},
  { path: '**', redirectTo: 'kezdolap' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
