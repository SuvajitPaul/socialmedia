import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class GoogleserviceService {
  user: any;
  authData: any = {};

  constructor(private fireauth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.fireauth.authState.subscribe((res) => {
      this.user = res;
      console.log('login sso', this.user);
      this.authData['FirstName'] = this.user.displayName;
      this.authData['email'] = this.user.email;
      this.authData['gender'] = "googleuser";
      this.authData['role_id'] = "Google User";
      this.authData['UserName'] = "Google User";
    })
  }
  googleLogin() {
    this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log('Login Succesfull');
      localStorage.setItem('authData', JSON.stringify(this.authData));
      this.toastr.success('Login', 'success');
      this.router.navigateByUrl('/postauth/home');
      console.log('route');
    }).catch((err) => {
      console.log(err);
    });
  }
}
