import { coerceStringArray } from '@angular/cdk/coercion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetCandidate } from 'src/app/shared/interfaces/GetCandidate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="/api/v1";
  constructor(private http: HttpClient, private router: Router) { }

  getUsers(): any {
    return this.http.get(this.url+'/getusers');
  }

  getUserId(userId: number): any {
    return this.http.get(`${this.url}/getuser/${userId}`);
  }

  getUser(credentials: any): any {
    // console.log(credentials);
    return this.http.post(`${this.url}/getuser`, credentials);
  }

  getCandidates(userId: any): any {
    return this.http.post(`${this.url}/getcandidates`, userId);
  }

  getCandidate(id: any): any {
    return this.http.get(`${this.url}/user/candidate/${id}`);
  }

  updateCandidate(updatedCandidate: any) {
    return this.http.post(`${this.url}/candidates/updatecandidate`, updatedCandidate);
  }

  saveUser(credentials: any): any {
    return this.http.post(`${this.url}/adduser`, credentials);
  }

  updateUser(updateUser: any): any {
    return this.http.put(`${this.url}/updateuser`, updateUser);
  }

  getStreams(id: Number) {
    return this.http.get(this.url+'/getstreams/'+id);
  }

  getUsers1(): any {
    return this.http.get(this.url+'/getpaneldetails');
  }
}
