import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostshareService } from 'src/app/service/postshare.service';
import { PostprojectService } from 'src/app/service/postproject.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchService } from 'src/app/service/search.service';
import { MatButtonModule } from '@angular/material/button';
import { UserdetailsService } from 'src/app/service/userdetails.service';
import { CommonnModule } from 'src/app/shared/commonn/commonn.module';



@NgModule({
  declarations: [
    ProfileComponent, 
  ],
  imports: [
    CommonModule,
    CommonnModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ProfileRoutingModule
  ],
  providers:[PostshareService,PostprojectService,UserdetailsService,SearchService]
})
export class ProfileModule { }
