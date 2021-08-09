import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path:'',
    canActivate:[LoginGuard],
    loadChildren: () => import('./preauth/preauth.module').then(m=>m.PreauthModule),
  },
  {
    path:'postauth',
    canActivate:[AuthGuard],
    loadChildren: () => import('./postauth/postauth.module').then(m=>m.PostauthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
