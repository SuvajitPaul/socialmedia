
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WildcardComponent } from './wildcard/wildcard.component';

const routes: Routes = [
  {
    
      path:'home',
      loadChildren: () => import('./home/home.module').then(m=>m.HomeModule),
    
  },
  {
    
    path:'profile',
    loadChildren: () => import('./profile/profile.module').then(m=>m.ProfileModule),
  
},
{
    
  path:'jobs',
  loadChildren: () => import('./jobs/jobs.module').then(m=>m.JobsModule),

},
{
    
  path:'projects',
  loadChildren: () => import('./projects/projects.module').then(m=>m.ProjectsModule),

},
{
  path:'**',
  component:WildcardComponent

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostauthRoutingModule { }
