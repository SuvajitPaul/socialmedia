import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { GoogleserviceService } from 'src/app/service/googleservice.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  Loginform: FormGroup;
  isFormValid: boolean = false;
  visible: boolean = false;
  reg: any;
  userName: any;
  passWord: any;
  dynType: string = 'password';
  user: any;
  reglink: any;
  authError:any;

  constructor(private route: Router, private formBuilder: FormBuilder, private auth: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService, private googleservice: GoogleserviceService,private toaster: ToastrService) {
    this.Loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
    });
  }
  ngOnDestroy(): void {
    if (this.reglink) {
      this.reglink.unsubscribe();
      console.log('Destroy');
    }
  }

  ngOnInit(): void {
    this.message();
  }

  logindata() {
    this.spinner.show();
    if (this.Loginform.valid) {
      this.isFormValid = false;
      this.userName = this.Loginform.getRawValue().email;
      this.passWord = this.Loginform.getRawValue().password;
      this.regdata();
    }
    else {
      this.spinner.hide();
      this.isFormValid = true;
    }
  }
  regdata(){
    this.auth.login( this.userName, this.passWord);
  }
  storedata() {
    this.toastr.success('Login', 'success');
    console.log('credential correct', this.user.data);
    localStorage.setItem('authData', JSON.stringify(this.user.data));
    localStorage.setItem('authData1', JSON.stringify(this.user));
    this.route.navigateByUrl('/postauth/home');
  }
  googlesignin() {
    this.googleservice.googleLogin();
  }
  message(){
    this.auth.eventAuthErrors.subscribe(data =>{
      this.spinner.hide();
      this.authError = data;
    })
  }
}
