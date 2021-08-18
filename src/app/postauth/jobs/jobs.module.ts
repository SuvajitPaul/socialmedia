import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs/jobs.component';
import { PostshareService } from 'src/app/service/postshare.service';
import { SearchService } from 'src/app/service/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonnModule } from 'src/app/shared/commonn/commonn.module';
@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    CommonModule,
    CommonnModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,  
    JobsRoutingModule
  ],
  providers:[PostshareService,SearchService]
})
export class JobsModule { }
