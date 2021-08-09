import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { PostprojectService } from 'src/app/service/postproject.service';
import { SearchService } from 'src/app/service/search.service';

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ProjectsRoutingModule
  ],
  providers:[PostprojectService,SearchService]
})
export class ProjectsModule { }
