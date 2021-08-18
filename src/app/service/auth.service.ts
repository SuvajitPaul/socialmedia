import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthErrors = this.eventAuthError.asObservable();
  userData: any;
  Post_collection: any;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private toaster: ToastrService) { }

  createUser(user: any) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(userCredentials => {
      this.newUser = user;
      console.log("user", userCredentials);
      console.log("new user", this.newUser);
      userCredentials.user?.updateProfile({
        displayName: this.newUser.FirstName,
      })
      this.insertUserData(userCredentials)
        .then(() => {
          this.toaster.success("Register Successfully");
          this.router.navigateByUrl('');
        });
    })
      .catch(error => {
        this.eventAuthError.next(error);
        this.toaster.error("Login Failed");
      });
  }
  insertUserData(userCredentials: any) {
    console.log('insert store');
    return this.db.doc(`User/${userCredentials.user.uid}`).set({
      fullname: this.newUser.FirstName,
      email: this.newUser.email,
      Phonenumber: this.newUser.Phonenumber,
      profession: this.newUser.role_id,
      gender: this.newUser.gender,
      password: this.newUser.password,
    })
  }
  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          localStorage.setItem('authData', JSON.stringify(userCredential.user));
          this.router.navigateByUrl('/postauth/home');
        }
      })
      .catch(error => {
        this.eventAuthError.next(error);
      })
  }
  logout() {
    console.log('logout');
    return this.afAuth.signOut();
  }
  getUserState() {
    return this.afAuth.authState;
  }


}
