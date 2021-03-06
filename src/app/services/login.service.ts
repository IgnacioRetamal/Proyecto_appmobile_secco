import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ConversionBase64: string;
  constructor(private http: HttpClient) { }
  public URLservidor: String;
  public URLSecundaria: String =  'https://secco-app.herokuapp.com';

  realizaLogin(usuario:String, contrasena:String){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{

      this.URLservidor = this.URLSecundaria;
    }
    this.ConversionBase64 = btoa(usuario+":"+contrasena);

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json;profile="urn:org.apache.isis/v1"');
      headers = headers.append('Authorization', 'Basic '+this.ConversionBase64);

    const URL = this.URLSecundaria+'/restful/services/simple.PlantaMenu/actions/listarTodas/invoke';
    return this.http.get<any>(URL, {headers: headers})  

  } 
}