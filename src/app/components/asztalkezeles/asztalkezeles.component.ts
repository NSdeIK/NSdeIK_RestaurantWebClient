import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AsztalService} from "../../service/asztal.service";
import {Asztal} from "../../model/asztal";
import {FormBuilder, Validators} from "@angular/forms";
import {Szemely} from "../../model/szemely";
import {FoglaltAsztal} from "../../model/foglaltAsztal";

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
  constructor(private route: ActivatedRoute, private asztalService: AsztalService, private _formBuilder: FormBuilder) {}

  id! : string;
  asztal!: Asztal;
  szemelyek!: Szemely[];
  kivalasztott!: Szemely;
  foglaltAsztalAdatok!: FoglaltAsztal;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.asztalService.getAsztal(this.id).subscribe(data => {
      if(data.statusz == 'foglalt'){
        this.asztal = data.statusz;
        this.foglaltAsztalAdatok = data;
        console.log(this.foglaltAsztalAdatok)
      }else{
        this.asztal = data;
      }
    })

    this.asztalService.getSzemelyek().subscribe(data => {
      this.szemelyek = data;
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
          console.log(data)
          this.foglaltAsztalAdatok = data
          this.asztal.statusz = "foglalt"
        },
        error: (hiba) => {
          console.error(hiba)
        }
      }
      )
  }

}
