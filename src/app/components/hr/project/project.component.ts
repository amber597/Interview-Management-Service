import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { Candidate } from 'src/app/shared/interfaces/candidate';
import { GetCandidate } from 'src/app/shared/interfaces/GetCandidate';
import { Project } from 'src/app/shared/interfaces/Project';

let CANDIDATE_DATA: GetCandidate[];




export interface ProjectStreamDetails {
  javaSelected: number,
  devopsSelected: number,
  automationSelected: number,
  totalSelected: Number,
  totalJava: number,
  totalDevops: number,
  totalAutomation: number,
  totalCandidates: Number
}

@Component({
  selector: 'ims-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project!: Project;

  projectStreamDetails!: ProjectStreamDetails; 

  candidates!: GetCandidate[];
  filteredCandidates: GetCandidate[] = [];

  displayedColumns: string[] = ['candidateId', 'candidateName', 'project','Round 1' , 'Round 1 Status', 'Round 2', 'Round 2 Status', 'status'];
  pageSlice!: GetCandidate[]; 
  dataSource = this.pageSlice;

  
    

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private candidateService: CandidateService ) { }


  loadCandidates(id: number): void {
    this.projectService.getProject(id).subscribe(
      (response: any) => {
        this.project = response;
      },
      (error:any) => {
        console.log(error);
      }
    ); 
    
    this.projectService.getCandidates(id).subscribe(
      (response: any)=> {
        this.candidates = response;
        this.filteredCandidates =this.candidates;
        this.pageSlice = this.filteredCandidates.slice(0, 5);
        this.dataSource = this.pageSlice;
        // console.log(this.candidates);
      },
      (error: any)=>{
        console.log("cannot find candidates", error)
      }
    );
  }

  loadProjectStreamDetails(projectId: Number): void {

    this.projectService.getProjectStreamDetails(projectId).subscribe(
      (response: any) => {
        this.projectStreamDetails = response;
        console.log(response, this.projectStreamDetails);
      },
      (error: any) => {
        console.log(error);
      }
    )
    
  
  }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      routeParams => {
        this.loadCandidates(routeParams.projectId);
        this.loadProjectStreamDetails(routeParams.projectId);
      }
    );
  }

  onPageChange(event: PageEvent): void {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.filteredCandidates.length) {
      endIndex = this.filteredCandidates.length;
    }
    this.pageSlice = this.filteredCandidates.slice(startIndex, endIndex);
    this.dataSource = this.pageSlice;
  }
  onSearch(filteredList: GetCandidate[]) : void {
    
    this.filteredCandidates = filteredList;
    // console.log(this.filteredCandidates);
    this.dataSource = this.filteredCandidates.slice(0, 5);
  }

  allocateAll() : void {
    this.candidateService.allocateAllPending().subscribe(
      (response: any) => {
        // console.log(response);
        location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
