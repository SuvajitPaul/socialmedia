import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data: any;
  login: any;
  islogin: any;
  value: any;
  googleLogin: any;
  constructor(private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let link: any = (state.url == "/postauth/home" || state.url == "/postauth/projects" || state.url == "/postauth/profile" || state.url == "/postauth/jobs" || state.url == "/postauth/message");
    if (link) {
      this.islogin = this.authroute();
      if (this.islogin) {
        console.log("Success", this.islogin);
        return true;
      }
      else {
        console.log("Failure");
        this.route.navigateByUrl('');
        return false;
      }
    }
    return true;
  }
  authroute(): any {
    this.data = localStorage.getItem('authData');
    if (this.data) {
      console.log("get");
      this.login = JSON.parse(this.data);
      return this.login;
    } else {
      console.log("not get");
      this.route.navigateByUrl('');
      return false;
    }
  }
}
