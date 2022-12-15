import {Component, OnInit} from '@angular/core';
import {Etlap} from "../../model/etlap";
import {EtlapService} from "../../service/etlap.service";
import {FormBuilder, Validators} from "@angular/forms";
import {EtlapkezelesDialogDobozComponent} from "../dialog-doboz/etlapkezeles-dialog-doboz.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-etlap',
  templateUrl: './etlap.component.html',
  styleUrls: ['./etlap.component.css']
})
export class EtlapComponent implements OnInit{
  adatok!: Etlap[];
  etlap_neve! : string;
  etlap_ara! : string;
  snackBarConfig : MatSnackBarConfig = {horizontalPosition:"center",verticalPosition: "top", duration: 2500};

  constructor(private etlapService: EtlapService,private formBuilder: FormBuilder, private matDialog: MatDialog, private snackBar : MatSnackBar){}

  ngOnInit() {
    this.etlapService.osszes().subscribe(data => {
      this.adatok = data
    })
  }

  etel_etlap = this.formBuilder.group({
    etel_neve: ['',Validators.required],
    etel_ara: ['',Validators.required]
  });

  ital_etlap = this.formBuilder.group({
    ital_neve: ['',Validators.required],
    ital_ara: ['',Validators.required]
  });

  etel_mentes(){
    let objekt = this.get_objekt(
      this.etel_etlap.get('etel_neve')?.value,
      this.etel_etlap.get('etel_ara')?.value
    )

    this.etlapService.addEtel(objekt).subscribe(data => {
      this.etel_etlap.reset()
      this.adatok.push(data)
    })

  }

  ital_mentes() {
    let objekt = this.get_objekt(
      this.ital_etlap.get('ital_neve')?.value,
      this.ital_etlap.get('ital_ara')?.value
    )

    this.etlapService.addItal(objekt).subscribe(data => {
      this.ital_etlap.reset()
      this.adatok.push(data)
    })
  }

  modosit(etlap: Etlap, muvelet: string){
    const dialogRef = this.matDialog.open(EtlapkezelesDialogDobozComponent, {
      height: "40%",
      width: "40%",
      data: {"melyik": etlap, "muvelet": muvelet}
    });

    dialogRef.afterClosed().subscribe( eredmeny => {
      if(eredmeny && eredmeny.data){
        let objekt = {
          "etlap_id": eredmeny.data.etlap_id,
          "etlap_neve": eredmeny.data.etlap_neve,
          "etlap_ara": eredmeny.data.etlap_ara,
        }
        if(eredmeny.data.etlap_tipus == "ETEL"){
          this.etlapService.addEtel(objekt).subscribe({
            next: data => {
              let itemIndex = this.adatok.findIndex(item => item.etlap_id == data.etlap_id);
              this.adatok[itemIndex] = data;
              this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig);
            },
            error: err => {
              this.snackBar.open("Hiba történt! Oka: "+err,"OK",this.snackBarConfig);
            }
          });

        }else if(eredmeny.data.etlap_tipus == "ITAL"){
          this.etlapService.addItal(objekt).subscribe({
            next: data => {
              let itemIndex = this.adatok.findIndex(item => item.etlap_id == data.etlap_id);
              this.adatok[itemIndex] = data;
              this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig)
            },
            error: err => {
              this.snackBar.open("Hiba történt! Oka: "+err,"OK",this.snackBarConfig);
            }
          })
        }
      }else if(eredmeny && eredmeny.id){
        this.etlapService.etlapTorles(eredmeny.id).subscribe({
          next: () =>{
            this.snackBar.open("Sikeresen megtörtént!","OK",this.snackBarConfig)
            this.adatok = this.adatok.filter( h => h.etlap_id !== eredmeny.id);
          },
          error: err =>{
            this.snackBar.open("Hiba történt! Oka: "+err,"OK",this.snackBarConfig);
          }
        });

      }

    })
  }

  get_objekt(neve: string | null | undefined, ara: string | null | undefined){
    let objekt = {
      "etlap_neve": neve,
      "etlap_ara": ara,
    }
    return objekt
  }

}
