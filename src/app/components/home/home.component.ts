import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public dialog:MatDialog ){}

  items = [2015,2017,2018,2021,2022];

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '560px',
      width: '800px',
      panelClass: 'mat-dialog-container',
      backdropClass: 'dialogBackground',
      });
  }
}
