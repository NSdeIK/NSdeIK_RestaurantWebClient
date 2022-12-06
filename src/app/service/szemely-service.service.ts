import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Szemely } from '../model/szemely'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SzemelyServiceService {

  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://localhost:8080/restaurant/api/szemelyek'
  }

  public osszesSzemely(): Observable<Szemely[]> {
    return this.http.get<Szemely[]>(this.apiUrl);
  }
}
