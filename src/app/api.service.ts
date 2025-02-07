import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public saveuserdetail(payload:any){
    const url="http://localhost:8080/user/signup";
    return this.http.post(url,payload);
  }

  public loginuserdetail(payload:any){
    const url="http://localhost:8080/user/login";
    return this.http.post(url,payload);
  }
}
