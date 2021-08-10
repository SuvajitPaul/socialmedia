import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header/header.component';
import { SearchService } from 'src/app/service/search.service';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



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
    HeaderRoutingModule
  ],
  exports:[
    HeaderComponent,
    PostComponent
  ],
  providers:[SearchService]
})
export class HeaderModule { }
