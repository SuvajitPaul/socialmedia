import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs/jobs.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { PostshareService } from 'src/app/service/postshare.service';
import { SearchService } from 'src/app/service/search.service';

@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,  
    FooterModule,
    JobsRoutingModule
  ],
  providers:[PostshareService,SearchService]
})
export class JobsModule { }
