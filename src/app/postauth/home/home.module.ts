import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PostshareService } from 'src/app/service/postshare.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { PostprojectService } from 'src/app/service/postproject.service';
import { MatDialogModule } from '@angular/material/dialog';
import { PostthoughtsService } from 'src/app/service/postthoughts.service';
import { ImageserviceService } from 'src/app/service/imageservice.service';
import { DescribePipe } from 'src/app/shared/pipe/describe.pipe';
import { SearchService } from 'src/app/service/search.service';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
@NgModule({
  declarations: [
    HomeComponent,
    DescribePipe,
    LeftpanelComponent,   
  ],
  imports: [
    CommonModule,
    HeaderModule,
    HeaderModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),  
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HomeRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers:[PostshareService,PostprojectService,PostthoughtsService,ImageserviceService,SearchService]
})
export class HomeModule { }
