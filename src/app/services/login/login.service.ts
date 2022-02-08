
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="/api/v1";

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  //calling the server to generate token
  generateToken(credentials: any) {
    //token generate
    return this.http.post(`${this.url}/token`, credentials);
  }

  //for login user 
  loginUser(token: any, credentials: any): any {
    localStorage.setItem("token", token);

    let loggedIn: boolean = false;
    
    
    this.userService.getUser(credentials).subscribe(
      (response: any) => {
        
        // console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem("level", response.level);
        let level = this.getLevel();
        if(level != null && level != undefined && level != '' && level!='null') {
          
          let level = this.getLevel();
          console.log(level);
          if(level == 'hr') {
              window.location.href = '/hrdashboard';
          } else if(level == 'panel') {
            window.location.href = '/paneldashboard';
          } else if(level == 'admin') {
            window.location.href = '/admindashboard';
          } 

        } else {
          window.location.href = '/notassigned';
        }
        
       
      },
      (error: any) => {
        console.log(error);
        
      }
    );
    
      
    
    
  }

  //to check if user is logged in or not
  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    if(token==undefined || token == '' || token == null) {
      return false;
    }
    return true;
  }

  //to logout the user
  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    // location.reload();
    return true;
  }

  //for getting the token
  getToken() {
    return localStorage.getItem('token');
  }

  getLevel() {
    return localStorage.getItem('level');
  }

  getUser() {
    return localStorage.getItem('user')
  }
}
