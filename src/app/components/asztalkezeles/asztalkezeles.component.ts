import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AsztalService} from "../../service/asztal.service";
import {Asztal} from "../../model/asztal";
import {FormBuilder, Validators} from "@angular/forms";
import {Szemely} from "../../model/szemely";
import {FoglaltAsztal} from "../../model/foglaltAsztal";
import {MegrendelesVarolista} from "../../model/megrendelesVarolista";
import {MatDialog} from "@angular/material/dialog";
import {AsztalkezelesDialogDobozComponent} from "../dialog-doboz/asztalkezeles-dialog-doboz.component";
import {EtlapService} from "../../service/etlap.service";
import {Etlap} from "../../model/etlap";
import {Megrendelesek} from "../../model/megrendelesek";

@Component({
  selector: 'app-asztalkezeles',
  templateUrl: './asztalkezeles.component.html',
  styleUrls: ['./asztalkezeles.component.css']
})
export class AsztalkezelesComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private route: ActivatedRoute, private asztalService: AsztalService,private etlapService: EtlapService, private _formBuilder: FormBuilder, private matDialog: MatDialog) {}

  id! : string;
  asztal!: Asztal;
  szemelyek!: Szemely[];
  kivalasztott!: Szemely;
  foglaltAsztalAdatok!: FoglaltAsztal;
  megrendeles_varolista: MegrendelesVarolista[] = [];
  megrendelesek : Megrendelesek[] = [];
  etlapok!: Etlap[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.asztalService.getAsztal(this.id).subscribe(data => {
      if(data.statusz == 'foglalt'){
        this.asztal = data.statusz;
        this.foglaltAsztalAdatok = data;
        this.megrendeles_varolista = data.varolista;
        this.megrendelesek = data.megrendelesek;
      }else{
        this.asztal = data;
      }
    })

    this.asztalService.getSzemelyek().subscribe(data => {
      this.szemelyek = data;
    })

    this.etlapService.osszes().subscribe(data => {
      this.etlapok = data;
    })
}
  changeValue(value:any){
    this.kivalasztott = value;
  }

  asztalfoglalas(){
    let objekt = {
      "asztal_id" : this.asztal.asztal_id,
      "kezelo_szemely_id" : this.kivalasztott.szemely_id,
      "vendegek_szama" : this.firstFormGroup.value.firstCtrl
    }
    this.asztalService.asztalFoglalas(objekt).subscribe(
      {
        next: (data) => {
          this.foglaltAsztalAdatok = data
          this.asztal.statusz = "foglalt"
        },
        error: (hiba) => {
          console.error(hiba)
        }
      }
      )
  }

  kifizetesi_osszeg(){
    return this.megrendelesek.filter(i => i.megrendeles_ara).reduce((a,b) => a+b.megrendeles_ara, 0);
    //return this.megrendelesek.filter(item => item.megrendeles_ara).reduce((sum, current) => sum + current.megrendeles_ara, 0);
  }

  dialog_add(muvelet:string) {

    const dialogRef = this.matDialog.open(AsztalkezelesDialogDobozComponent, {
      width: "70%",
      data: {"muvelet":muvelet,"etlap": this.etlapok}
    });

    dialogRef.afterClosed().subscribe(eredmeny => {
      if(eredmeny.melyik == 1){
        let varolista = new MegrendelesVarolista()
        varolista.megrendeles_id = eredmeny.etlap.etlap_id;
        varolista.megrendeles_neve = eredmeny.etlap.etlap_neve;
        varolista.megrendeles_db = eredmeny.darab;

        let mostani = new Date();
        varolista.megrendeles_bekeresi_ido = mostani.getHours()+":"+mostani.getMinutes();

        let objekt = {
          "asztalid": this.id,
          "megrendeles_id": varolista.megrendeles_id,
          "megrendeles_neve": varolista.megrendeles_neve,
          "megrendeles_db": varolista.megrendeles_db,
          "megrendeles_bekeresi_ido": varolista.megrendeles_bekeresi_ido
        }

        this.asztalService.ujMegrendelesVarolista(objekt).subscribe();
        this.megrendeles_varolista.push(varolista);

      }else if(eredmeny.melyik == 2){
        let megrendelesek = new Megrendelesek()
        megrendelesek.megrendeles_id = eredmeny.etlap.etlap_id;
        megrendelesek.megrendeles_db = eredmeny.darab;
        megrendelesek.megrendeles_ara = eredmeny.etlap.etlap_ara * eredmeny.darab;
        megrendelesek.megrendeles_neve = eredmeny.etlap.etlap_neve;
        this.megrendelesek.push(megrendelesek)

        let objekt = {
          "asztalid": this.id,
          "megrendeles_id": megrendelesek.megrendeles_id,
          "megrendeles_neve": megrendelesek.megrendeles_neve,
          "megrendeles_db": megrendelesek.megrendeles_db,
          "megrendeles_ara": megrendelesek.megrendeles_ara
        }

        this.asztalService.ujMegrendeles(objekt).subscribe();

      }
    })
  }


}
