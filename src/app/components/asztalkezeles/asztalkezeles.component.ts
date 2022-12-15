import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-asztalkezeles',
  templateUrl: './asztalkezeles.component.html',
  styleUrls: ['./asztalkezeles.component.css']
})
export class AsztalkezelesComponent {
  asztalfoszama = this._formBuilder.group({
    maxfo: ['', Validators.required],
  });
  asztalkezeloszemely = this._formBuilder.group({
    kezeloszemely: [Szemely, Validators.required],
  });
  constructor(private route: ActivatedRoute,private router: Router, private asztalService: AsztalService,private etlapService: EtlapService, private _formBuilder: FormBuilder, private matDialog: MatDialog, private snackBar : MatSnackBar) {}

  id! : string;
  asztal!: Asztal;
  szemelyek!: Szemely[];
  kivalasztott!: Szemely;
  foglaltAsztalAdatok!: FoglaltAsztal;
  megrendeles_varolista: MegrendelesVarolista[] = [];
  megrendelesek : Megrendelesek[] = [];
  etlapok!: Etlap[];
  snackBarConfig : MatSnackBarConfig = {horizontalPosition:"center",verticalPosition: "top", duration: 2500};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.asztalService.getAsztal(this.id).subscribe({
      next: (data) => {
        if (data.statusz == 'foglalt') {
          this.asztal = data.statusz;
          this.foglaltAsztalAdatok = data;
          this.megrendeles_varolista = data.varolista;
          this.megrendelesek = data.megrendelesek;
        } else if (data.statusz == 'szabad') {
          this.asztal = data;
        }
      },
      error: () => {
        this.router.navigateByUrl('/')
      }
    });

    this.asztalService.getSzemelyek().subscribe(data => {
      this.szemelyek = data;
    });

    this.etlapService.osszes().subscribe(data => {
      this.etlapok = data;
    });
}
  changeValue(value:any){
    this.kivalasztott = value;
  }

  asztalfoglalas(){
    let objekt = {
      "asztal_id" : this.asztal.asztal_id,
      "kezelo_szemely_id" : this.kivalasztott.szemely_id,
      "vendegek_szama" : this.asztalfoszama.value.maxfo
    }
    this.asztalService.asztalFoglalas(objekt).subscribe(
      {
        next: (data) => {
          this.foglaltAsztalAdatok = data
          this.asztal.statusz = "foglalt"
        },
        error: (err) => {
          this.snackBar.open("Hiba történt! Oka: "+err,"OK",this.snackBarConfig);
        }
      }
      )
  }

  kifizetesi_osszeg(){
    return this.megrendelesek.filter(item => item.megrendeles_ara).reduce((sum, current) => sum + current.megrendeles_ara * current.megrendeles_db, 0);
  }

  veglegesites(){
    let veglegesites_ido = new Date()
    let objekt = {
      "asztal_id": this.foglaltAsztalAdatok.asztal_id,
      "asztal_nev": this.foglaltAsztalAdatok.asztal_nev,
      "kezelo_pincer_nev": this.foglaltAsztalAdatok.kezelo_szemely_nev,
      "kifizetesi_osszeg": this.kifizetesi_osszeg(),
      "mikor_veglegesitette": veglegesites_ido
    }
    this.asztalService.veglegesites(objekt).subscribe({
      next: () => {
        this.router.navigateByUrl('/kezdolap')
      },error: (err) =>{
        this.hiba_snackbar(err);
      }
    });
  }

  dialog_add(muvelet:string) {
    let config;
    if(muvelet == 'veglegesites')
    {
      config = {
        width: "50%",
        data: {"muvelet":muvelet,"osszeg":this.kifizetesi_osszeg()}
      }
    }else{
      config = {
        width: "70%",
        data: {"muvelet":muvelet,"etlap": this.etlapok}
      }
    }
    const dialogRef = this.matDialog.open(AsztalkezelesDialogDobozComponent, config);

    dialogRef.afterClosed().subscribe(eredmeny => {
      if (eredmeny) {
        if(eredmeny.event == 'hozzaad') {
          if (eredmeny.melyik == 1) {
            let varolista = new MegrendelesVarolista()
            varolista.megrendeles_id = eredmeny.etlap.etlap_id;
            varolista.megrendeles_neve = eredmeny.etlap.etlap_neve;
            varolista.megrendeles_db = eredmeny.darab;

            let mostani = new Date();
            varolista.megrendeles_bekeresi_ido = mostani.getHours() + ":" + mostani.getMinutes();

            let objekt = {
              "asztalid": this.id,
              "megrendeles_id": varolista.megrendeles_id,
              "megrendeles_neve": varolista.megrendeles_neve,
              "megrendeles_db": varolista.megrendeles_db,
              "megrendeles_bekeresi_ido": varolista.megrendeles_bekeresi_ido
            }

            this.asztalService.ujMegrendelesVarolista(objekt).subscribe({
              next: () => { this.sikeres_snackbar() },
              error: err => { this.hiba_snackbar(err) }
            });
            this.megrendeles_varolista.push(varolista);

          }
          else if (eredmeny.melyik == 2) {
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

            this.asztalService.ujMegrendeles(objekt).subscribe({
              next: () =>{
                this.sikeres_snackbar();
            },error: err => {
                this.hiba_snackbar(err);
              }
            });

          }
        }else if(eredmeny.event == 'veglegesites'){
          this.veglegesites();
        }
      }
    })
  }

  sikeres_snackbar(){
    this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig);
  }
  hiba_snackbar(err:string){
    this.snackBar.open("Hiba történt! Oka: "+err,"OK",this.snackBarConfig);
  }

}
