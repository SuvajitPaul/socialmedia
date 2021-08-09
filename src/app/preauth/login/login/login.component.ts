import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegService } from 'src/app/service/reg.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { GoogleserviceService } from 'src/app/service/googleservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  Loginform: FormGroup;
  isRegisterFormValid: boolean = false;
  visible: boolean = false;
  reg: any;
  userName: any;
  passWord: any;
  dynType: string = 'password';
  user: any;
  reglink: any;

  constructor(private route: Router, private formBuilder: FormBuilder, private regservice: RegService, private toastr: ToastrService, private spinner: NgxSpinnerService, private googleservice: GoogleserviceService) {
    this.Loginform = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
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
  }

  logindata() {
    this.spinner.show();
    if (this.Loginform.valid) {
      this.isRegisterFormValid = false;
      this.userName = this.Loginform.getRawValue().username;
      this.passWord = this.Loginform.getRawValue().password;
      this.regdata();
    }
    else {
      this.spinner.hide();
      this.isRegisterFormValid = true;
    }
  }
  regdata() {
    this.reglink = this.regservice.View().subscribe((res) => {
      this.reg = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      this.user = this.reg.find((item: any) => item.data.UserName === this.userName && item.data.password === this.passWord);
      console.log('find', this.user);
      if (this.user) {
        setTimeout(() => {
          this.storedata();
          this.spinner.hide();
        }, 1000);
      }
      else {
        this.spinner.hide();
        this.toastr.error('Login Failed', 'Error');
        console.log('credential incorrect');
      }
    })
  }
  showpassword(type: string) {
    if (this.visible == true) {
      this.visible = false;
      this.dynType = 'text';
    } else {
      this.visible = true;
      this.dynType = 'password';
    }
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
}
