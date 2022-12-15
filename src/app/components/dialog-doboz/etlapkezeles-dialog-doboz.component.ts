import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Etlap } from "../../model/etlap";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-doboz',
  templateUrl: './etlapkezeles-dialog-doboz.component.html',
  styles: [
  ]
})


export class EtlapkezelesDialogDobozComponent{

  adatok : any;

  constructor(public dialog: MatDialogRef<EtlapkezelesDialogDobozComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public adat: any, private _formBuilder: FormBuilder) {
    this.adatok = {...adat};
  }

  modosit(event:any){
    let objekt = {
      "etlap_id": event.target.etlap_id.value,
      "etlap_neve": event.target.etlap_nev.value,
      "etlap_ara": event.target.etlap_ara.value,
      "etlap_tipus": event.target.etlap_tipus.value
    }
    this.dialog.close({data:objekt});
  }

  torles(etlap : Etlap){
    this.dialog.close({id : etlap.etlap_id});
  }
}
