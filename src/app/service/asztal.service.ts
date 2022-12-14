import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Asztal} from "../model/asztal";
import {Szemely} from "../model/szemely";

@Injectable({
  providedIn: 'root'
})
export class AsztalService {

  private readonly asztalokUrl: string;
  private readonly ujAsztalUrl: string;
  private readonly asztalTorlesUrl: string;
  private readonly asztalUrl: string;
  private readonly getSzemelyekListaUrl: string;
  private readonly asztalFoglalasUrl: string;
  private readonly ujMegrendelesVarolistaUrl: string;
  private readonly ujMegrendelesUrl: string;

  constructor(private http: HttpClient) {
    this.asztalokUrl = 'http://localhost:8080/restaurant/api/asztalok';
    this.asztalUrl = 'http://localhost:8080/restaurant/api/asztal';
    this.ujAsztalUrl = 'http://localhost:8080/restaurant/api/admin/ujAsztal';
    this.asztalTorlesUrl ='http://localhost:8080/restaurant/api/admin/asztalTorles';
    this.getSzemelyekListaUrl ='http://localhost:8080/restaurant/api/szemelyek';
    this.asztalFoglalasUrl = 'http://localhost:8080/restaurant/api/asztal_lefoglalas';
    this.ujMegrendelesVarolistaUrl = 'http://localhost:8080/restaurant/api/asztal_ujmegrendelesvarolista';
    this.ujMegrendelesUrl = 'http://localhost:8080/restaurant/api/asztal_ujmegrendeles';
  }

  public osszesAsztal(): Observable<Asztal[]> {
    return this.http.get<Asztal[]>(this.asztalokUrl);
  }

  public ujAsztal(data: any){
    return this.http.post<any>(this.ujAsztalUrl,data);
  }

  public asztalFoglalas(data: any){
    return this.http.post<any>(this.asztalFoglalasUrl,data);
  }

  public asztalTorles(id: string){
    return this.http.delete<any>(this.asztalTorlesUrl+"/"+id);
  }

  public getAsztal(id: string): Observable<any> {
    return this.http.get<Asztal>(this.asztalUrl+"/"+id);
  }

  public getSzemelyek(): Observable<Szemely[]> {
    return this.http.get<Szemely[]>(this.getSzemelyekListaUrl);
  }

  public ujMegrendelesVarolista(data: any){
    return this.http.post<any>(this.ujMegrendelesVarolistaUrl,data);
  }

  public ujMegrendeles(data: any){
    return this.http.post<any>(this.ujMegrendelesUrl,data);
  }
}
