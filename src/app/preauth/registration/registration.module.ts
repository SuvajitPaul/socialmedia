import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FooterModule } from '../../shared/footer/footer.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { RegService } from 'src/app/service/reg.service';

@NgModule({
  declarations: [
    RegistrationComponent, 
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  providers:[RegService]
})
export class RegistrationModule { }
