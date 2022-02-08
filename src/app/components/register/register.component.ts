import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'ims-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  match = false;
  message = ''

  candidate = {
    username: "",
    email: '',
    password: '',
  }
  confirmPassword = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.candidate.password != this.confirmPassword) {
      this.match = true;
      this.message = `passwords don't match`;
      setTimeout(() => {
        this.match = false;
      }, 5000);
    } else {
      if (this.candidate.username != null && this.candidate.username != '' && this.candidate.password != null && this.candidate.password != '') {
        this.userService.saveUser({
          username: this.candidate.username,
          password: this.candidate.password
        }).subscribe(
          (response: any) => {
            // console.log(response);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.log(error);
            this.message = ' User already exists';
            this.match = true;
            setTimeout(() => {
              this.match = false;
            }, 5000);
          }
        )
      }
    }

  }
}
