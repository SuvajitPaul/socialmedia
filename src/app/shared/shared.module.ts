import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { DescribePipe } from './pipe/describe.pipe';
import { CustomDirective } from './directive/custom.directive';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomepipePipe } from './pipe/customepipe.pipe';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    CustomepipePipe,
    DescribePipe,
    CustomDirective,
    PostComponent
  ],
  imports: [
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  exports:[
    PostComponent
  ],
  
})
export class SharedModule { }
