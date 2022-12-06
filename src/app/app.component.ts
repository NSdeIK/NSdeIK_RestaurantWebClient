import { Component } from '@angular/core';
import { TokenStorageService } from "./service/tokenStorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'XYZ - Étterem';
  bejelentkezve = false;
  felhasznalonev?: string;
  role?: string | null;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.bejelentkezve = !!this.tokenStorageService.getToken();
    if(this.bejelentkezve){
      this.role = this.tokenStorageService.getRole();
    }
  }

  kijelentkezes(): void {
    this.tokenStorageService.kijelentkezes();
    window.location.reload();
  }
}
