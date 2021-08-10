import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { PostshareService } from 'src/app/service/postshare.service';
import { PostprojectService } from 'src/app/service/postproject.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegService } from 'src/app/service/reg.service';
import { CustomepipePipe } from 'src/app/shared/pipe/customepipe.pipe';
import { SearchService } from 'src/app/service/search.service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ProfileComponent, 
    CustomepipePipe
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MatButtonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ProfileRoutingModule
  ],
  providers:[PostshareService,PostprojectService,RegService,SearchService]
})
export class ProfileModule { }
