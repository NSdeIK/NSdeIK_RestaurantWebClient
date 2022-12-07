import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Szemely } from "../../model/szemely";

@Component({
  selector: 'app-dialog-doboz',
  templateUrl: './dialog-doboz.component.html',
  styles: [
  ]
})


export class DialogDobozComponent {

  adatok : any;
  muveletTipus : string;

  constructor(public dialog: MatDialogRef<DialogDobozComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public adat: Szemely[]) {
    this.adatok = {...adat};
    this.muveletTipus = this.adatok.muvelet;
  }

  frissites(){
    this.dialog.close({event:this.muveletTipus,data:this.adatok});
  }

  bezaras(){
    this.dialog.close({event: 'Mégse'})
  }
}
