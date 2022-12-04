import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = 'http://localhost:8080/restaurant/bejelentkezes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(felhasznalonev: string, jelszo: string): Observable<any>{
    return this.http.post(AUTH_API, {
      felhasznalonev,jelszo
    }, httpOptions);
  }

}
