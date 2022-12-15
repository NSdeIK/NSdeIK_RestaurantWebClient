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
  private readonly torlesetlap: string;
  private readonly apiurl = "http://localhost:8080/restaurant/api";

  constructor(private http: HttpClient) {
    this.addEtelUrl = this.apiurl+'/admin/addEtel';
    this.addItalUrl = this.apiurl+'/admin/addItal';
    this.osszesEtlapUrl = this.apiurl+'/osszesEtlap';
    this.torlesetlap = this.apiurl+'/admin/etlapTorles';
  }

  public addEtel(data: any){
    console.log(data)
    return this.http.post<any>(this.addEtelUrl,data);
  }

  public addItal(data: any){
    return this.http.post<any>(this.addItalUrl,data);
  }

  public etlapTorles(id : string){
    return this.http.delete<any>(this.torlesetlap+"/"+id);
  }

  public osszes(){
    return this.http.get<any>(this.osszesEtlapUrl);
  }
}
