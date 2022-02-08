import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLoggedIn()) {
        if(this.loginService.getLevel() == null || this.loginService.getLevel() == '' || this.loginService.getLevel() == undefined) {
          this.router.navigate(['/notassigned']);
        } else if(this.loginService.getLevel() == 'hr') {
          this.router.navigate(['/hrdashboard']);
        } else if(this.loginService.getLevel() == 'panel' ) {
          this.router.navigate(['/paneldashboard']);
        }

        return false;
      }
    return true;
  }
  
}
