import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Custom import
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BejelentkezesComponent } from "./components/login/bejelentkezes/bejelentkezes.component"

import { authInterceptorProviders } from './auth/auth.interceptor';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';
import { SzemelyListaComponent } from "./components/szemely-lista/szemely-lista.component";
//
//import { SzemelyServiceService } from './service/szemely-service.service';
//import { SzemelyListaComponent } from './szemely-lista/szemely-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    BejelentkezesComponent,
    KezdolapComponent,
    SzemelyListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
