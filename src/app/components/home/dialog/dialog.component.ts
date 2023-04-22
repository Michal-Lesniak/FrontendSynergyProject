import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IntegrationDetailsComponent } from '../../integration-details/integration-details.component';
import { IntegrationDetail } from 'src/app/models/integration-detail';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  lastIntegration?: IntegrationDetail;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any){}
  
  ngOnInit(): void {
    this.lastIntegration = this.data.lastIntegration;
    console.log(this.lastIntegration);
  }

}
