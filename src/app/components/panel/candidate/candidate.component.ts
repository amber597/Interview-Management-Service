import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetCandidate } from 'src/app/shared/interfaces/GetCandidate';
import { GetUser } from 'src/app/shared/interfaces/GetUser';

@Component({
  selector: 'ims-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidate!: GetCandidate;
  user!: GetUser;
  status!: String;
  score!: Number;

  constructor(private loginService: LoginService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.user = JSON.parse( <string>this.loginService.getUser());

    let id = this.route.snapshot.params.candidateId;
    // console.log(id);
    this.userService.getCandidate(id).subscribe(
      (response: any)=> {
        this.candidate=response;
        // console.log(this.candidate);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getUsers(): any {
    let getUsers: any = this.candidate.getUsers;
    let selectedUsers: any = [];
    getUsers.forEach((element: any) => {
      if(element.userStatus != "pending") {
        selectedUsers.push(element);
      }
    });
    return selectedUsers;
  }

  onSubmit(): void {
    if(this.status !=null && this.status!='' && this.score!=null) {
      // console.log(this.score);
      this.userService.updateCandidate({
        candidateId: this.candidate.candidateId,
        userId: this.user.userId,
        score: this.score,
        status: this.status
      }).subscribe(
        (response: any) => {
          // console.log(response);
          // location.href = '/paneldashboard';
          this.router.navigate(['/paneldashboard']);
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }
}
