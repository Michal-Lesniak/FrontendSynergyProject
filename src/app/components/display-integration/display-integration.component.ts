import { Component, OnInit, Version } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Integration } from 'src/app/models/integration';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';
import { ImageService } from 'src/app/services/image/image.service';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { VersionService } from 'src/app/services/version/version.service';


@Component({
  selector: 'app-display-integration',
  templateUrl: './display-integration.component.html',
  styleUrls: ['./display-integration.component.css']
})
export class DisplayIntegrationComponent implements OnInit {

  name?:string | null;
  integration_id?: number;
  integration?: IntegrationDetail;
  listVersion?: VersionBudget[];

  srcImage?:any;

  constructor(private route:ActivatedRoute, private router:Router, private integrationService: IntegrationService, private imageService:ImageService, private versionService:VersionService){
    this.integration_id = (this.router.getCurrentNavigation()?.extras.state)!['id'];
  }

  ngOnInit(){
    this.name = this.route.snapshot.paramMap.get('name');

    this.integrationService.getIntegrationById(this.integration_id!).subscribe(res => {
      console.log(res);
      this.integration = res;
    });

    this.versionService.getVersionFromIntegration(this.integration_id!).subscribe(res => {
      console.log(res);
      this.listVersion = res;
    });

 
}
}
