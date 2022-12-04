import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { TokenStorageService } from "../../../service/tokenStorage.service";

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit{
  form: any = {
    felhasznalonev: null,
    jelszo: null
  };
  bejelentkezve = false;
  sikertelenBejelentkezes = false;
  hibaUzenet = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.bejelentkezve = true;
    }
  }

  onSubmit(): void {

    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.tokenMentes(data.token);
        this.bejelentkezve = true;
        this.sikertelenBejelentkezes = false;
        this.oldalFrissites();
      },
      error: hiba => {
        this.hibaUzenet = hiba.error;
        this.sikertelenBejelentkezes = true;
      }
    })
  }
  oldalFrissites(): void {
    location.reload();
  }
}

