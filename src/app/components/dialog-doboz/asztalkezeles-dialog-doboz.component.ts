import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Etlap } from "../../model/etlap";
import { MegrendelesVarolista } from "../../model/megrendelesVarolista";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-doboz',
  templateUrl: './asztalkezeles-dialog-doboz.component.html',
  styles: [
  ]
})


export class AsztalkezelesDialogDobozComponent{

  etlapTipusGroup = this._formBuilder.group({
    melyik: new FormControl('1'),
  });
  megrendelesGroup = this._formBuilder.group({
    etlap: [Etlap, Validators.required],
    etlapDarab: [1, Validators.required]
  });

  adatok : any;
  etlap!: Etlap[];
  osszeg: number = 0;
  kivalasztottAdatok : any;
  kivalasztottEtlapTipus = 1;
  muveletTipus : string;

  constructor(public dialog: MatDialogRef<AsztalkezelesDialogDobozComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public adat: any, private _formBuilder: FormBuilder) {
    this.adatok = {...adat};
    this.muveletTipus = this.adatok.muvelet;
    if(this.muveletTipus == 'hozzaad'){
      this.etlap = this.adatok.etlap;
    }else{
      this.osszeg = this.adatok.osszeg;
    }
  }

  frissites(){
    if(this.muveletTipus == 'hozzaad'){
      this.dialog.close({event:this.muveletTipus,data:this.adatok});
    }else{
      this.dialog.close({event:this.muveletTipus});
    }
  }

  bezaras(){
    this.dialog.close({event: 'Mégse'})
  }

  kivalasztottTipus(event:any){
    this.kivalasztottEtlapTipus = event.value;
  }
  get etlap_id() {
    return this.megrendelesGroup.get('etlap')?.getRawValue().etlap_id
  }

  get etlap_neve() {
    return this.megrendelesGroup.get('etlap')?.getRawValue().etlap_neve
  }

  get darab() {
    return this.megrendelesGroup.get('etlapDarab')?.value
  }

  etlapTipus(){
    if(this.kivalasztottEtlapTipus == 1){
      this.kivalasztottAdatok = this.etlap.filter(objektum => {
        return objektum['etlap_tipus'] == "ETEL";
      });
    }else if(this.kivalasztottEtlapTipus == 2){
      this.kivalasztottAdatok = this.etlap.filter(objektum => {
        return objektum['etlap_tipus'] == "ITAL";
      });
    }
  }

  hozzaad(){
    this.dialog.close({"event": this.muveletTipus,"melyik": this.kivalasztottEtlapTipus, "etlap": this.megrendelesGroup.get('etlap')?.getRawValue(), "darab": this.darab});
  }

}
