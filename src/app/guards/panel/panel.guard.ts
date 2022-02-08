import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PanelGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLoggedIn()) {
        let level = this.loginService.getLevel();

        if(level != 'panel') {

          if(level == null || level == '') {
            this.router.navigate(['/notassigned']);
            return false;
          } else if(level == 'hr') {
            this.router.navigate(['/hrdashboard']);
            return false;
          } else if(level == 'admin') {
            this.router.navigate(['/admindashboard']);
            return false;
          }

        }

        return true;
        
      }
    this.router.navigate(['login']);
    return false;
  
  }
  
}
