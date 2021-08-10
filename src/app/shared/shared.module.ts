import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { DescribePipe } from './pipe/describe.pipe';
import { CustomDirective } from './directive/custom.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomepipePipe } from './pipe/customepipe.pipe';



@NgModule({
  declarations: [
    CustomepipePipe,
    DescribePipe,
    CustomDirective,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  
})
export class SharedModule { }
