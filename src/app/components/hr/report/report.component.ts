import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

export interface PeriodicElement {
  id: number;
  name: string;
  interviewed: number;
  pending: number;
  total: number;
  
}


const ELEMENT_DATA: PeriodicElement[]  = []




@Component({
  selector: 'ims-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  displayedColumns1: string[] = ['position', 'name', 'interviewed', 'pending', 'total','progress'];
  dataSource1 = ELEMENT_DATA;
 

  constructor(private userService: UserService) {

  }
  

  ngOnInit(): void {

    this.userService.getUsers1().subscribe(
      (response: any) => {
        this.dataSource1 = response;
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )
    
  }

}
