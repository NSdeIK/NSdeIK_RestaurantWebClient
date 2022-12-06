import { Component, OnInit } from '@angular/core';
import { Szemely } from '../../model/szemely';
import { SzemelyServiceService } from '../../service/szemely-service.service'

@Component({
  selector: 'app-szemely-lista',
  templateUrl: './szemely-lista.component.html',
  styleUrls: ['./szemely-lista.component.css']
})
export class SzemelyListaComponent implements OnInit{

  szemelyek!: Szemely[];

  constructor(private szemelyService: SzemelyServiceService){

  }

  ngOnInit() {
    this.szemelyService.osszesSzemely().subscribe(data => {
      this.szemelyek = data;
    })
  }


}
