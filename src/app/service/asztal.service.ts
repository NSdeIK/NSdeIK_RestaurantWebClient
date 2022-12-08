import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Asztal} from "../model/asztal";

@Injectable({
  providedIn: 'root'
})
export class AsztalService {

  private asztalokUrl: string;
  private ujAsztalUrl: string;
  private asztalTorlesUrl: string;

  constructor(private http: HttpClient) {
    this.asztalokUrl = 'http://localhost:8080/restaurant/api/asztalok';
    this.ujAsztalUrl = 'http://localhost:8080/restaurant/api/ujAsztal';
    this.asztalTorlesUrl ='http://localhost:8080/restaurant/api/asztalTorles';
  }

  public osszesAsztal(): Observable<Asztal[]> {
    return this.http.get<Asztal[]>(this.asztalokUrl);
  }

  public ujAsztal(data: any){
    return this.http.post<any>(this.ujAsztalUrl,data);
  }

  public asztalTorles(id: string){
    return this.http.delete<any>(this.asztalTorlesUrl+"/"+id);
  }

}
