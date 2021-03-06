import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  RegisterForm: FormGroup;
  visible: boolean = false;
  authError:any;
  dynType: string = 'password';
  isFormValid: boolean = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private toastr: ToastrService, private router: Router) {
    this.RegisterForm = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobilenumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      profession: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
    },
      {
        validator: this.MustMatch('password', 'confirmpassword')
      });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.message();
  }
  regdata() {
    if (this.RegisterForm.valid) {
      this.isFormValid = false;
      let record: any = {};
      record['FirstName'] = this.RegisterForm.value.fullname;
      record['Phonenumber'] = this.RegisterForm.value.mobilenumber;
      record['email'] = this.RegisterForm.value.email;
      record['gender'] = this.RegisterForm.value.gender;
      record['role_id'] = this.RegisterForm.value.profession;
      record['password'] = this.RegisterForm.value.password;
      this.auth.createUser(record);
    } else {
      this.isFormValid = true;
    }
    console.log(this.RegisterForm.value);
  }
  reset() {
    this.RegisterForm.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  message(){
    this.auth.eventAuthErrors.subscribe(data =>{
      this.authError = data;
    })
  }
}
