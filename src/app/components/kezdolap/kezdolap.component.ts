import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsztalService} from "../../service/asztal.service";
import {Asztal} from "../../model/asztal";
import {TokenStorageService} from "../../service/tokenStorage.service";
import {DialogDobozComponent} from "../dialog-doboz/dialog-doboz.component";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MegrendelesVarolista} from "../../model/megrendelesVarolista";
import {interval, map, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-kezdolap',
  templateUrl: './kezdolap.component.html',
  styleUrls: ['./kezdolap.component.css']
})
export class KezdolapComponent implements OnInit,OnDestroy{
  asztalok!: Asztal[];
  megrendelesek: MegrendelesVarolista[] = [];
  keszmegrendelesek: MegrendelesVarolista[] = [];
  timerSubscription!: Subscription;
  bejelentkezve = false;
  role?: string | null;

  constructor(private asztalService: AsztalService, private tokenStorage: TokenStorageService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.bejelentkezve = !!this.tokenStorage.getToken();
    if (this.bejelentkezve) {
      this.role = this.tokenStorage.getRole();
    }
    if(this.role != null && this.role != "SZAKACS")
    {
      this.asztalService.osszesAsztal().subscribe(data => {
        this.asztalok = data;
      })
    }else {
      this.timerSubscription = timer(0,10000).pipe(map(() => {
        this.asztalService.osszesMegrendelesek().subscribe(data => {
          this.megrendelesek = data;
        })

      })).subscribe();
    }
  }

  ngOnDestroy() {
    if(this.role == 'SZAKACS')
    {
      this.timerSubscription.unsubscribe();
    }
  }

  atdob(event: CdkDragDrop<MegrendelesVarolista[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let id = event.container.data[event.currentIndex].id;
      this.asztalService.torlesMegrendelesVarolista(id).subscribe();
    }
  }

  dialog_add(muvelet: string) {
    const dialogRef = this.matDialog.open(DialogDobozComponent, {
      width: "300px",
      data: {asztal: {}, "muvelet": muvelet}
    });

    dialogRef.afterClosed().subscribe(eredmeny => {
      if (eredmeny) {
        if (eredmeny.event === "Új asztal") {
          let fo = eredmeny.data.asztal.fo;
          let objekt = {
            "asztal_nev": eredmeny.data.asztal.asztalneve,
            "maxfo": fo,
            "statusz": "szabad"
          }

          this.asztalService.ujAsztal(objekt).subscribe({
              next: (result) => {
                this.asztalok.push(result)
              },
              error: () => {
              }
            }
          )
        }
      }
    })
  }

  dialog(muvelet: string, asztal : Asztal){
    const dialogRef = this.matDialog.open(DialogDobozComponent,{
      width: "300px",
      data: {
        asztal,
        "muvelet": muvelet
      }
    });

    dialogRef.afterClosed().subscribe(eredmeny => {
      if(eredmeny) {
        if(eredmeny.event === "Törlés"){
          let id = eredmeny.data.asztal.asztal_id
          this.asztalService.asztalTorles(id).subscribe(
            {
              next: () => {
                this.asztalok = this.asztalok.filter( h => h.asztal_id !== id);
              },
              error: () => {}
            }
          )
        }
      }
    });

  }
}


