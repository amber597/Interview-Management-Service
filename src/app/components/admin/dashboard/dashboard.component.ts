import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { GetUser } from 'src/app/shared/interfaces/GetUser';




let Users: GetUser[] = [];

@Component({
  selector: 'ims-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public constructor(private userService: UserService) {

  }

  
  displayedColumns: string[] = ['No', 'username', 'role'];

  allUsers: GetUser[] =[];
  unassignedUsers: GetUser[] = [];

  dataSource = Users;
  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      (response: any)=> {
        // console.log(response);
        this.allUsers = response;
        this.allUsers.forEach(user => {
          if(user.level==null || user.level == '') {
            this.unassignedUsers.push(user);
          }
        });
        this.dataSource = this.unassignedUsers;

      },
      (error: any)=> {
        console.log(error);
      }
    );
  }

}
