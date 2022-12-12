import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Custom import
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BejelentkezesComponent } from "./components/login/bejelentkezes/bejelentkezes.component"

import { authInterceptorProviders } from './auth/auth.interceptor';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';
import { SzemelyListaComponent } from "./components/szemely-lista/szemely-lista.component";
import { DialogDobozComponent } from './components/dialog-doboz/dialog-doboz.component';
import { MatDialogModule } from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { AsztalkezelesComponent } from './components/asztalkezeles/asztalkezeles.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    AppComponent,
    BejelentkezesComponent,
    KezdolapComponent,
    SzemelyListaComponent,
    DialogDobozComponent,
    AsztalkezelesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
