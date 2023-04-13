import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/home/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NewIntegrationComponent } from './components/new-integration/new-integration.component';
import { FormsModule } from '@angular/forms';
import { IntegrationDetailsComponent } from './components/integration-details/integration-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { DisplayIntegrationComponent } from './components/display-integration/display-integration.component';
import { VersionViewComponent } from './components/integration-details/versionView/version-view/version-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DialogComponent,
    NewIntegrationComponent,
    IntegrationDetailsComponent,
    DisplayIntegrationComponent,
    VersionViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule, 
    MatTableModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
