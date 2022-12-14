import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EtlapService {

  private readonly addEtelUrl: string;
  private readonly addItalUrl: string;
  private readonly osszesEtlapUrl: string;

  constructor(private http: HttpClient) {
    this.addEtelUrl = 'http://localhost:8080/restaurant/api/admin/addEtel';
    this.addItalUrl = 'http://localhost:8080/restaurant/api/admin/addItal';
    this.osszesEtlapUrl = 'http://localhost:8080/restaurant/api/osszesEtlap';
  }

  public addEtel(data: any){
    console.log(data)
    return this.http.post<any>(this.addEtelUrl,data);
  }

  public addItal(data: any){
    return this.http.post<any>(this.addItalUrl,data);
  }

  public osszes(){
    return this.http.get<any>(this.osszesEtlapUrl);
  }
}
