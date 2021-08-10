import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { RegService } from 'src/app/service/reg.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { GoogleserviceService } from 'src/app/service/googleservice.service';

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatIconModule,
    LoginRoutingModule
  ],
  providers: [RegService,GoogleserviceService]
})
export class LoginModule { }
