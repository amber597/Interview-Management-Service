import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetCandidate } from 'src/app/shared/interfaces/GetCandidate';


let CANDIDATE_DATA: GetCandidate [];

interface GetUser {
  userId: number,
  userName: String,
  userScore: number | null,
  userStatus: String | null
}

@Component({
  selector: 'ims-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['No', 'name', 'projectName', 'stream'];
  

  AllCandidates: GetCandidate[] = [];
  selectedCandidates: GetCandidate[] = [];
  rejectedCandidates: GetCandidate[] = [];
  pendingCandidates: GetCandidate[] = [];
  filteredCandidates: GetCandidate[] = [];
  pageSlice: GetCandidate[] = [];
  dataSource = this.pageSlice;


  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {

    let user: GetUser = JSON.parse( <string>this.loginService.getUser());
    // console.log(user.userId);
    this.userService.getCandidates({
      userId: user.userId
    }).subscribe(
      (response: any) => {
        // console.log(response);
        this.AllCandidates = response;
        // console.log(this.AllCandidates);
        this.AllCandidates.forEach((candidate)=> {
          if(candidate.candidateStatus == 'allocated') {
            let getUsers: GetUser[] = candidate.getUsers;

            getUsers.forEach(element => {
              if(user.userId == element.userId) {
                if(element.userStatus == 'selected') {
                  this.selectedCandidates.push(candidate);

                } else if(element.userStatus == 'rejected') {
                  this.rejectedCandidates.push(candidate);
                } else if(element.userStatus == 'pending') {
                  this.pendingCandidates.push(candidate);
                }
              }
            });

          } else if(candidate.candidateStatus == 'rejected') {
            this.rejectedCandidates.push(candidate);
          } else if(candidate.candidateStatus == 'selected') {
            this.selectedCandidates.push(candidate);
          }
        });
        this.filteredCandidates = this.pendingCandidates;
        this.pageSlice = this.filteredCandidates.slice(0,5);
        this.dataSource = this.pageSlice;

      },
      (error: any) => {
        console.log(error);
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
  onSearch(filteredList: GetCandidate[]) : void {
    
    this.filteredCandidates = filteredList;
    // console.log(this.filteredCandidates);
    this.dataSource = this.filteredCandidates.slice(0, 5);
  }


}
