import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostauthRoutingModule } from './postauth-routing.module';
import { WildcardComponent } from './wildcard/wildcard.component';
import { CustomDirective } from '../shared/directive/custom.directive';
import { PostauthComponent } from './postauth.component';
import { HeaderModule } from 'src/app/shared/header/header.module';

@NgModule({
  declarations: [
    CustomDirective,
    WildcardComponent,
    PostauthComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    PostauthRoutingModule
  ]
})
export class PostauthModule { }
