import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddCandidate } from 'src/app/shared/interfaces/AddCandidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private url = "/api/v1/candidates"

  constructor(private http: HttpClient ,private router: Router) { }

  getCandidates(): any {
    return this.http.get(this.url);
  }

  addCandidate(addCandidate: AddCandidate): any {
    return this.http.post(this.url, addCandidate);
  }
  
  allocateAllPending(): any {
    return this.http.get(this.url+'/allocateallpending');
  }
}
