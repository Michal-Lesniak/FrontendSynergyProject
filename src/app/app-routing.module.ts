import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewIntegrationComponent } from './components/new-integration/new-integration.component';

const routes:Routes = [
  {path:'home', component: HomeComponent},
  {path:'new', component: NewIntegrationComponent},
  {path:'**', redirectTo: 'home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
