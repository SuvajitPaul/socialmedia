import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { RegService } from 'src/app/service/reg.service';

@NgModule({
  declarations: [
    RegistrationComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  providers:[RegService]
})
export class RegistrationModule { }
