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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: new FormControl('1'),
  });
  secondFormGroup = this._formBuilder.group({
    etlap: [Etlap, Validators.required],
    etlapDarab: [1, Validators.required]
  });

  adatok : any;
  etlap!: Etlap[];
  kivalasztottAdatok : any;
  kivalasztottEtlapTipus = 1;
  muveletTipus : string;

  constructor(public dialog: MatDialogRef<AsztalkezelesDialogDobozComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public adat: any, private _formBuilder: FormBuilder) {
    this.adatok = {...adat};
    this.etlap = this.adatok.etlap;
    this.muveletTipus = this.adatok.muvelet;
  }

  frissites(){
    this.dialog.close({event:this.muveletTipus,data:this.adatok});
  }

  bezaras(){
    this.dialog.close({event: 'Mégse'})
  }

  kivalasztottTipus(event:any){
    this.kivalasztottEtlapTipus = event.value;
  }
  get etlap_id() {
    return this.secondFormGroup.get('etlap')?.getRawValue().etlap_id
  }

  get etlap_neve() {
    return this.secondFormGroup.get('etlap')?.getRawValue().etlap_neve
  }

  get darab() {
    return this.secondFormGroup.get('etlapDarab')?.value
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
    this.dialog.close({"melyik": this.kivalasztottEtlapTipus, "etlap": this.secondFormGroup.get('etlap')?.getRawValue(), "darab": this.darab});
  }

}
