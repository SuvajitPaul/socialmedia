import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { PostprojectService } from 'src/app/service/postproject.service';
import { SearchService } from 'src/app/service/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonnModule } from 'src/app/shared/commonn/commonn.module';
@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    CommonnModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    ProjectsRoutingModule
  ],
  providers:[PostprojectService,SearchService]
})
export class ProjectsModule { }
