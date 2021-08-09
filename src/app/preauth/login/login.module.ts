import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { RegService } from 'src/app/service/reg.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { GoogleserviceService } from 'src/app/service/googleservice.service';

@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxSpinnerModule,
    MatIconModule,
    LoginRoutingModule
  ],
  providers: [RegService,GoogleserviceService]
})
export class LoginModule { }
