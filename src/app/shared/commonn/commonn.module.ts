import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonnRoutingModule } from './commonn-routing.module';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from 'src/app/service/search.service';

@NgModule({
  declarations: [
    HeaderComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonnRoutingModule
  ],
  exports:[
    HeaderComponent,
    PostComponent
  ],
  providers:[SearchService]
})
export class CommonnModule { }
