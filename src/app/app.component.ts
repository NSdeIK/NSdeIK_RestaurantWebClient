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

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.bejelentkezve = !!this.tokenStorageService.getToken();
  }

  kijelentkezes(): void {
    this.tokenStorageService.kijelentkezes();
    window.location.reload();
  }
}
