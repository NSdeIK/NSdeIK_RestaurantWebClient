import {Component, OnInit} from '@angular/core';
import {Etlap} from "../../model/etlap";
import {EtlapService} from "../../service/etlap.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-etlap',
  templateUrl: './etlap.component.html',
  styleUrls: ['./etlap.component.css']
})
export class EtlapComponent implements OnInit{
  adatok!: Etlap[];
  etlap_neve! : string;
  etlap_ara! : string;

  constructor(private etlapService: EtlapService,private formBuilder: FormBuilder,){}

  ngOnInit() {
    this.etlapService.osszes().subscribe(data => {
      this.adatok = data
    })
  }

  etel_etlap = this.formBuilder.group({
    etel_neve: '',
    etel_ara: ''
  });

  ital_etlap = this.formBuilder.group({
    ital_neve: '',
    ital_ara: ''
  });

  etel_mentes(){
    let objekt = this.get_objekt(
      this.etel_etlap.get('etel_neve')?.value,
      this.etel_etlap.get('etel_ara')?.value
    )

    this.etlapService.addEtel(objekt).subscribe(data => {
      this.etel_etlap.reset()
      this.adatok.push(data)
      console.log(this.adatok)
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

  get_objekt(neve: string | null | undefined, ara: string | null | undefined){
    let objekt = {
      "etlap_neve": neve,
      "etlap_ara": ara,
    }
    return objekt
  }

}
