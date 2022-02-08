import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private url = '/api/v1/streams'
  constructor(private http: HttpClient, private router: Router) { }

  getStreams(): any {
    return this.http.get(this.url);
  }
}
