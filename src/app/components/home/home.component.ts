
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { Integration } from 'src/app/models/integration';
import { ImageService } from 'src/app/services/image/image.service';
import { SafeUrl} from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @ViewChild("newIntegratioButton") newIntegrationButton!:ElementRef; 

  constructor(public dialog:MatDialog, 
    private integrationService:IntegrationService, 
    private imageService: ImageService, 
    private sanitizer: DomSanitizer ){}
 
  public integrations?:Integration[];


  ngOnInit(): void {
    this.integrationService.getIntegrations().pipe(first()).subscribe(res => {
      this.integrations = res; 
      this.setImagesToIntegration();
    });
  }


  private setImagesToIntegration(): void {
    this.integrations?.forEach(integration => {
      this.imageService.getImageById(integration.id!).pipe(first()).subscribe(data => {   
        const blob = new Blob([data], { type: 'blob' }); // Create a Blob object from the image data
        const url = window.URL.createObjectURL(blob); // Generate a URL for the Blob object
        integration.srcImage = this.sanitizer.bypassSecurityTrustUrl(url); 
      });  
    });
  }
 
  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '560px',
      width: '800px',
      panelClass: 'mat-dialog-container',
      backdropClass: 'dialogBackground',
      data: {
        lastIntegration: this.integrations![this.integrations!.length - 1]
      }
      });
  }

}
