import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from 'src/app/services/stream/stream.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUser } from 'src/app/shared/interfaces/GetCandidate';
import { Stream } from 'src/app/shared/interfaces/stream';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'ims-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  streams = new FormControl();
  streamList: Stream[] = [];
  errorMessage:String = ''; 

  user!: GetUser;
  level!: String;
  panelType!: String;
  addedStreams!: Number[];

  public constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private streamService: StreamService) {

  }

  ngOnInit(): void {

    let id = this.route.snapshot.params.userId;

    this.userService.getUserId(id).subscribe(
      (response: any) => {
        // console.log(response);
        this.user = response;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.streamService.getStreams().subscribe(
      (response: any) => {
        this.streamList = response;
      }
    )

  }

  onSubmit(): void {
    if(this.level!=null && this.level!='') {
      
      if(this.level == 'hr') {
        
        this.userService.updateUser( {
          userId: this.user.userId,
          level: 'hr',
          streamIds: []
        }).subscribe(
          (response: any) => {
            // console.log(response);
            this.router.navigate(['/admindashboard']);
          },
          (error: any) => {
            console.log(error);
          }
        );

      } else  {
        if(this.panelType!=null && this.panelType!='' ) {

          if(this.panelType == 'manager') {
            this.userService.updateUser( {
              userId: this.user.userId,
              level: 'panel',
              streamIds: [4]
            }).subscribe(
              (response: any) => {
                // console.log(response);
                this.router.navigate(['/admindashboard']);
              },
              (error: any) => {
                console.log(error);
              }
            );
          } else if(this.panelType == 'tech') {
            if(this.streams!=null && this.streams.value!=null ) {
              this.userService.updateUser( {
                userId: this.user.userId,
                level: 'panel',
                streamIds: this.streams.value
              }).subscribe(
                (response: any) => {
                  // console.log(response);
                  this.router.navigate(['/admindashboard']);
                },
                (error: any) => {
                  console.log(error);
                }
              );
            } else {
              this.errorMessage = 'Streams'
            }
          }
        } else {
          this.errorMessage = 'Division';
        }
      }
    } else {
      this.errorMessage = "User Role";
    }
  };

}
