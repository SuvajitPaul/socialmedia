import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule),
  },
  {
    path:'reg',
    loadChildren: () => import('./registration/registration.module').then(m=>m.RegistrationModule),
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreauthRoutingModule { }
