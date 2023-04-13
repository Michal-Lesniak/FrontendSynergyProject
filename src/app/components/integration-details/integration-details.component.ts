import { ImageService } from './../../services/image/image.service';
import { Version } from '@angular/compiler';
import { SubcategoryService } from './../../services/subcategory/subcategory.service';
import { CategoryService } from './../../services/category/category.service';
import { VersionService } from './../../services/version/version.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { Integration } from 'src/app/models/integration';
import { concatMap, take } from 'rxjs';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';
import { SafeUrl } from '@angular/platform-browser';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';


export interface subcategory {
  name: string,
  cost: number,
  currentExpense: number,
}

@Component({
  selector: 'app-integration-details',
  templateUrl: './integration-details.component.html',
  styleUrls: ['./integration-details.component.css']
})
export class IntegrationDetailsComponent implements OnInit {

  integration_id?: number;
  integration?: IntegrationDetail;
  listVersion?: Array<VersionBudget>;
  mainVersion?: VersionBudget;
  tempVersion?: VersionBudget;
  imageURL?: SafeUrl;


  constructor(private router: Router,
    private integrationService: IntegrationService,
    private versionService: VersionService,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService) {
    this.integration_id = (router.getCurrentNavigation()?.extras.state)!['id'];
  }

  ngOnInit(): void {
    this.integrationService.getIntegrationById(this.integration_id!).subscribe(integration => { this.integration = integration; console.log(this.integration) });
    this.imageService.getImageById(this.integration_id!).subscribe(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
    });
    this.versionService.getVersionFromIntegration(this.integration_id!).subscribe(listversion => {
      this.listVersion = listversion;
      this.mainVersion = this.listVersion[0];
      console.log(this.listVersion);
      console.log(this.mainVersion);
      console.log(this.listVersion![0]!.categoryList)
    });

  }

  addVersion(version: VersionBudget) {
    this.listVersion?.push(version);
    this.tempVersion = version;
  }
}
