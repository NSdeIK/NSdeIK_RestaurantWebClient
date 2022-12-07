import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Szemely } from '../model/szemely'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SzemelyServiceService {

  private szemelyekUrl: string;
  private szemelyFrissitesUrl: string;
  private szemelyTorlesUrl: string;
  private addPincer: string;
  private addSzakacs: string;

  constructor(private http: HttpClient) {
    this.szemelyekUrl = 'http://localhost:8080/restaurant/api/szemelyek';
    this.szemelyFrissitesUrl = 'http://localhost:8080/restaurant/api/szemelyFrissites';
    this.szemelyTorlesUrl = 'http://localhost:8080/restaurant/api/szemelyTorles';
    this.addPincer = 'http://localhost:8080/restaurant/api/addPincer';
    this.addSzakacs = 'http://localhost:8080/restaurant/api/addSzakacs';
  }

  public osszesSzemely(): Observable<Szemely[]> {
    return this.http.get<Szemely[]>(this.szemelyekUrl);
  }

  public szemelyFrissites(id: string,data:any){
    const id_params = new HttpParams().append('id', id);
    return this.http.put<any>(this.szemelyFrissitesUrl,data,{params: id_params});
  }

  public szemelyTorles(id: string){
    return this.http.delete<any>(this.szemelyTorlesUrl+"/"+id);
  }

  public pincerAdd(data: any){
    return this.http.post<any>(this.addPincer,data);
  }

  public szakacsAdd(data: any){
    return this.http.post<any>(this.addSzakacs,data);
  }

}
