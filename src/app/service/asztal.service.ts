import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Asztal} from "../model/asztal";
import {Szemely} from "../model/szemely";

@Injectable({
  providedIn: 'root'
})
export class AsztalService {

  private readonly apiurl = "http://localhost:8080/restaurant/api";
  private readonly asztalokUrl: string;
  private readonly ujAsztalUrl: string;
  private readonly asztalTorlesUrl: string;
  private readonly asztalUrl: string;
  private readonly getSzemelyekListaUrl: string;
  private readonly asztalFoglalasUrl: string;
  private readonly ujMegrendelesVarolistaUrl: string;
  private readonly ujMegrendelesUrl: string;
  private readonly torlesMegrendelesVarolistaUrl: string;
  private readonly megrendelesekUrl: string;
  private readonly veglegesitesUrl: string;

  constructor(private http: HttpClient) {
    this.asztalokUrl = this.apiurl + '/asztalok';
    this.asztalUrl = this.apiurl + '/asztal';
    this.ujAsztalUrl = this.apiurl + '/admin/ujAsztal';
    this.asztalTorlesUrl = this.apiurl + '/admin/asztalTorles';
    this.getSzemelyekListaUrl = this.apiurl + '/szemelyek';
    this.asztalFoglalasUrl = this.apiurl + '/asztal_lefoglalas';
    this.ujMegrendelesVarolistaUrl = this.apiurl + '/asztal_ujmegrendelesvarolista';
    this.ujMegrendelesUrl = this.apiurl + '/asztal_ujmegrendeles';
    this.torlesMegrendelesVarolistaUrl = this.apiurl + '/asztal_torlesmegrendelesvarolista';
    this.megrendelesekUrl = this.apiurl + '/osszesmegrendelesek';
    this.veglegesitesUrl = this.apiurl + '/veglegesites';
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

  public veglegesites(data: any){
    return this.http.post<any>(this.veglegesitesUrl,data);
  }

  public getSzemelyek(): Observable<Szemely[]> {
    return this.http.get<Szemely[]>(this.getSzemelyekListaUrl);
  }

  public ujMegrendelesVarolista(data: any){
    return this.http.post<any>(this.ujMegrendelesVarolistaUrl,data);
  }

  public torlesMegrendelesVarolista(id: string){
    return this.http.delete<any>(this.torlesMegrendelesVarolistaUrl+"/"+id);
  }

  public ujMegrendeles(data: any){
    return this.http.post<any>(this.ujMegrendelesUrl,data);
  }

  public osszesMegrendelesek(){
    return this.http.get<any>(this.megrendelesekUrl);
  }
}
