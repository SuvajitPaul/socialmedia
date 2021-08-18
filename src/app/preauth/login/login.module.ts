import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";
import { GoogleserviceService } from 'src/app/service/googleservice.service';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/service/auth.service';

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatIconModule,
    LoginRoutingModule
  ],
  providers: [AuthService,GoogleserviceService]
})
export class LoginModule { }
