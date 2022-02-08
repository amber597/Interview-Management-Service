import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'ims-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any)=> {
        this.username = response.name;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
