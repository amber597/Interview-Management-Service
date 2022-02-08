import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'ims-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials={
    username: '',
    password: ''
  }

  incorrect=false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // console.log('form submited');
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)) {
      // console.log('submit the form');
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any)=> {
          // console.log(response);
          this.loginService.loginUser(response.token, this.credentials);

          
          // this.router.navigate(['/dashboard']);
          
        },
        error=> {
          this.incorrect = true;
          setTimeout(()=>{
            this.incorrect = false;
          }, 5000);
        }
      );
      // this.loginService.loginUser(this.loginService.getToken(), this.credentials);
    } else {
      console.log("fields are empty");
    }
    
  }
  
}
