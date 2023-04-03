import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { Integration } from 'src/app/models/integration';
import { ImageService } from 'src/app/services/image/image.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(public dialog:MatDialog, private integrationService:IntegrationService, private imageService: ImageService){}

  public integrations?:Integration[];
  imageSrc?:SafeUrl;

  ngOnInit(): void {
    this.integrationService.getIntegrations().subscribe(res => this.integrations = res);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '560px',
      width: '800px',
      panelClass: 'mat-dialog-container',
      backdropClass: 'dialogBackground',
      });
  }
}
