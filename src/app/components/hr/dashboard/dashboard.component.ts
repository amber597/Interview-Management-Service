import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
// import { MatPagina } from '@angular/material';
import { GetCandidate } from 'src/app/shared/interfaces/GetCandidate';
import { Round1Pipe } from 'src/app/shared/pipes/round1.pipe'

// const CANDIDATE_DATA: Candidate[] = [
//   { candidateId: 1, candidateName: "Sameer", candidateExperience: 1, rating: null, status: "pending", project: {}, stream: "devOps"},
//   { candidateId: 1, candidateName: "B Ajay", candidateExperience: 1, rating: null, status: "selected", project1: "survey", stream: "Automation"},
//   { candidateId: 1, candidateName: "Dushyant", candidateExperience: 1, rating: 7, status: "pending", project1: "survey", stream: "devOps"},
//   { candidateId: 1, candidateName: "Gaurav", candidateExperience: 1, rating: null, status: "selected", project1: "birthday", stream: "devOps"},
//   { candidateId: 1, candidateName: "Jayant", candidateExperience: 1, rating: 8, status: "pending", project1: "birthday", stream: "devOps"},
//   { candidateId: 1, candidateName: "Amber", candidateExperience: 1, rating: null, status: "selected", project1: "ims", stream: "devOps"},{ candidateId: 1, candidateName: "Anshu", candidateExperience: 1, rating: 7, status: "pending", project1: "ims", stream: "devOps"},
//   { candidateId: 1, candidateName: "Manoj", candidateExperience: 1, rating: null, status: "selected", project1: "survey", stream: "devOps"},
//   { candidateId: 1, candidateName: "Sajal", candidateExperience: 1, rating: null, status: "pending", project1: "birthday", stream: "devOps"}
// ]


let CANDIDATE_DATA: GetCandidate[];



@Component({
  selector: 'ims-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  candidates!: GetCandidate[];

  displayedColumns: string[] = ['candidateId', 'candidateName', 'project','Round 1','Round 1 Status', 'Round 2', 'Round 2 Status' ,'status'];
  filteredCandidates: GetCandidate[] = [];
  pageSlice: GetCandidate[] = [];
  dataSource = this.pageSlice;

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe(
      (response: any)=> {
        this.candidates = response;
        this.filteredCandidates = this.candidates
        this.pageSlice = this.filteredCandidates.slice(0, 5);
        this.dataSource = this.pageSlice;
        // console.log(this.candidates);
      },
      (error: any)=>{
        console.log("cannot find candidates", error)
      }
    )
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

  getRound1(candidate: GetCandidate): String {
    let message = "";

    if(candidate.getUsers.length == 0) {
      message = "pending";
    } else if(candidate.getUsers.length == 1) {
      message = candidate.getUsers[0].userName + ' / ' + candidate.getUsers[0].userStatus;
    }
    
    return message;
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
