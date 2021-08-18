import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PostshareService } from 'src/app/service/postshare.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { PostprojectService } from 'src/app/service/postproject.service';
import { DescribePipe } from 'src/app/shared/pipe/describe.pipe';
import { SearchService } from 'src/app/service/search.service';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonnModule } from 'src/app/shared/commonn/commonn.module';
@NgModule({
  declarations: [
    HomeComponent,
    DescribePipe,
    LeftpanelComponent,   
  ],
  imports: [
    CommonModule,
    CommonnModule,
    MatButtonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[PostshareService,PostprojectService,SearchService]
})
export class HomeModule { }
