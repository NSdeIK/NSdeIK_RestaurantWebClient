import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asztalkezeles',
  templateUrl: './asztalkezeles.component.html',
  styleUrls: ['./asztalkezeles.component.css']
})
export class AsztalkezelesComponent {

  constructor(private route: ActivatedRoute) {}

  id! : string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    });

}
}
