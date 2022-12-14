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
import {AsztalkezelesDialogDobozComponent} from "./components/dialog-doboz/asztalkezeles-dialog-doboz.component";
import {MatRadioModule} from "@angular/material/radio";
import { EtlapComponent } from './components/etlap/etlap.component';
import {MatCardModule} from "@angular/material/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {EtlapkezelesDialogDobozComponent} from "./components/dialog-doboz/etlapkezeles-dialog-doboz.component";

@NgModule({
  declarations: [
    AppComponent,
    BejelentkezesComponent,
    KezdolapComponent,
    SzemelyListaComponent,
    DialogDobozComponent,
    AsztalkezelesDialogDobozComponent,
    EtlapkezelesDialogDobozComponent,
    AsztalkezelesComponent,
    EtlapComponent,
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
        MatRadioModule,
        MatCardModule,
        DragDropModule,
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
