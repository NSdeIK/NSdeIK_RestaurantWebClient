import { Component, OnInit } from '@angular/core';
import { Szemely } from '../../model/szemely';
import { SzemelyServiceService } from '../../service/szemely-service.service'
import {MatDialog} from "@angular/material/dialog";
import {DialogDobozComponent} from "../dialog-doboz/dialog-doboz.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-szemely-lista',
  templateUrl: './szemely-lista.component.html',
  styleUrls: ['./szemely-lista.component.css']
})
export class SzemelyListaComponent implements OnInit{

  szemelyek!: Szemely[];
  snackBarConfig : MatSnackBarConfig = {horizontalPosition:"center",verticalPosition: "top", duration: 2500};

  constructor(private szemelyService: SzemelyServiceService, private matDialog: MatDialog, private snackBar : MatSnackBar){}

  ngOnInit() {
    this.szemelyService.osszesSzemely().subscribe(data => {
      this.szemelyek = data;
    })
  }
  dialog_add(muvelet: string){
    const dialogRef = this.matDialog.open(DialogDobozComponent,{
      width: "300px",
      data: { szemely:{},"muvelet": muvelet}
    });

    dialogRef.afterClosed().subscribe( eredmeny => {
      if(eredmeny)
      {
        if(eredmeny.event === "Hozzáadás"){

          let objekt = {
            "szemely_nev": eredmeny.data.szemely.szemely_nev,
            "szemely_poszt": eredmeny.data.szemely.szemely_poszt,
            "felhasznalonev": eredmeny.data.szemely.felhasznalonev,
            "jelszo": eredmeny.data.szemely.jelszo
          };

          switch (eredmeny.data.szemely.szemely_poszt){
            case "PINCER":
              this.szemelyService.pincerAdd(objekt).subscribe(
                {
                  next: (result) => { this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig), this.szemelyek.push(result)},
                  error: () => { this.snackBar.open("Hiba történt!","OK", this.snackBarConfig)}
                }
              )
              break;
            case "SZAKACS":
              this.szemelyService.szakacsAdd(objekt).subscribe(
                {
                  next: (result) => { this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig), this.szemelyek.push(result)},
                  error: () => { this.snackBar.open("Hiba történt!","OK", this.snackBarConfig)}
                }
              )
              break;
          }
        }
      }
    })
  }

  dialog(muvelet: string, szemely : Szemely){
    const dialogRef = this.matDialog.open(DialogDobozComponent,{
      width: "300px",
      data: {
        szemely,
        "muvelet": muvelet
      }
    });

    dialogRef.afterClosed().subscribe(eredmeny => {
      if(eredmeny) {
        if(eredmeny.event === "Szerkesztés") {
          let id = eredmeny.data.szemely.szemely_id
          let objekt = {
            "szemely_nev": eredmeny.data.szemely.szemely_nev,
            "szemely_poszt": eredmeny.data.szemely.szemely_poszt,
          };
          this.szemelyService.szemelyFrissites(id, objekt).subscribe(
            {
              next: () => { this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig)},
              error: () => { this.snackBar.open("Hiba történt!","OK", this.snackBarConfig)}
            }
          )
        }
        else if(eredmeny.event === "Törlés"){
          let id = eredmeny.data.szemely.szemely_id
          this.szemelyService.szemelyTorles(id).subscribe(
            {
              next: () => {
                this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig);
                this.szemelyek = this.szemelyek.filter( h => h.szemely_id !== id);
              },
              error: () => { this.snackBar.open("Hiba történt!","OK", this.snackBarConfig)}
            }
          )
        }
      }
    });

  }
}
