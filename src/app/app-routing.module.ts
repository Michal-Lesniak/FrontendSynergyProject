import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewIntegrationComponent } from './components/new-integration/new-integration.component';
import { IntegrationDetailsComponent } from './components/integration-details/integration-details.component';
import { DisplayIntegrationComponent } from './components/display-integration/display-integration.component';

const routes:Routes = [
  {path:'home', component: HomeComponent},
  {path:':name', component: DisplayIntegrationComponent},
  {path:'integration/new', component: NewIntegrationComponent},
  {path:'integration/details', component: IntegrationDetailsComponent },
  {path:'**', redirectTo: 'home', pathMatch: 'full'},
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
