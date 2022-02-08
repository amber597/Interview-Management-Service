import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddProject } from 'src/app/shared/interfaces/AddProject';
import { Project } from 'src/app/shared/interfaces/Project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = '/api/v1/projects'

  constructor(private http: HttpClient, private router: Router) { }

  getProjects(): any {
    return this.http.get(this.url);
  }

  getCandidates(id: number): any {
    return this.http.get(this.url + '/'+id +'/candidates');
  }

  getProject(id: number): any {
    return this.http.get(this.url + '/' + id);
  }
  
  getStreams(id: number): any {
    return this.http.get(`${this.url}/${id}/streams`);
  }

  addProject(addProject: AddProject): any {
    return this.http.post(this.url, addProject);
  }

  getProjectStreamDetails(id: Number) {
    return this.http.get(this.url+'/streamDetails/' + id);
  }
}
