import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let level = this.loginService.getLevel();
      if(level != 'admin') {
        if(level == 'panel') {
          location.href = '/paneldashboard';
        } else if(level == 'hr') {
          location.href == '/hrdashboard';
        } else {
          location.href == '/notassigned';
        }
        return false;
      }

    return true;
  }
  
}
