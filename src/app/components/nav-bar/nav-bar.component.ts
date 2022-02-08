import { Component, OnChanges, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUser } from 'src/app/shared/interfaces/GetUser';
import { Project } from 'src/app/shared/interfaces/Project';

@Component({
  selector: 'ims-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  public loggedIn=false;
  public userName: String | undefined="";

  projects!: Project[];

  constructor(private loginService: LoginService, private userService: UserService, private projectService: ProjectService) { }
  isLoggedin(): boolean {
    return this.loginService.isLoggedIn();
  }

  ngOnInit(): void {
    
    // this.userName = this.loginService.getUser().userName;
    let user: GetUser = JSON.parse(<string>this.loginService.getUser());
    if(user)
      this.userName = user.userName;
    if(this.isLoggedin()) {
      this.userService.getUsers().subscribe(
        (response: any)=> {
          this.projectService.getProjects().subscribe(
            (response: any) => {
              this.projects = response;
              // console.log(this.projects)
            },
            (error: any) => {
              console.log(error);
            }
          )
          // console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }

  ngOnChanges(): void {

  }

  logoutUser() {
    this.userName = '';
    this.loginService.logout();
  }

  isHr(): boolean {
    let level: String | undefined = this.loginService.getLevel()?.toString();
    if(level == 'hr') {
      return true;
    }
    return false;
  }
}
