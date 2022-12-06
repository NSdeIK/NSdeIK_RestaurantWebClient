import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SzemelyListaComponent } from './components/szemely-lista/szemely-lista.component';
import { BejelentkezesComponent } from "./components/login/bejelentkezes/bejelentkezes.component";
import { KezdolapComponent } from "./components/kezdolap/kezdolap.component";
import { AuthGuard } from "./auth/auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpRequestInterceptor} from "./auth/http.interceptor";

const routes: Routes = [
  {path: 'kezdolap', component: KezdolapComponent, canActivate: [AuthGuard]},
  {path: 'bejelentkezes', component: BejelentkezesComponent},
  {path: 'szemelyek', component: SzemelyListaComponent},
  //{path: 'szemelyek', component: SzemelyListaComponent},
  {path: '', redirectTo: 'kezdolap', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},AuthGuard]
})
export class AppRoutingModule { }
