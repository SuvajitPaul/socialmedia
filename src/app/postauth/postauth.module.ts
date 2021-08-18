import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostauthRoutingModule } from './postauth-routing.module';
import { WildcardComponent } from './wildcard/wildcard.component';
import { CustomDirective } from '../shared/directive/custom.directive';
import { PostauthComponent } from './postauth.component';

@NgModule({
  declarations: [
    CustomDirective,
    WildcardComponent,
    PostauthComponent
  ],
  imports: [
    CommonModule,
    PostauthRoutingModule
  ]
})
export class PostauthModule { }
