import { Version } from '@angular/compiler';
import { SubcategoryService } from './../../services/subcategory/subcategory.service';
import { CategoryService } from './../../services/category/category.service';
import { VersionService } from './../../services/version/version.service';
import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { Integration } from 'src/app/models/integration';
import { concatMap, take } from 'rxjs';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';


 export interface subcategory{
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
listVersion?:Array<VersionBudget>;
listCategory?: Array<ExpenseCategory>;

constructor(private router:Router,
  private integrationService: IntegrationService,
  private versionService: VersionService,
  private categoryService:CategoryService,
  private subcategoryService:SubcategoryService)
  {
  this.integration_id = (router.getCurrentNavigation()?.extras.state)!['id'];
  }

  ngOnInit(): void {
    this.integrationService.getIntegrationById(this.integration_id!).subscribe(integration => {this.integration = integration; console.log(this.integration)});
    this.versionService.getVersionFromIntegration(this.integration_id!).subscribe(listversion => {this.listVersion = listversion; console.log(this.listVersion)});
  }

  integrationName:string = "Integracja 2023";
  inputNameVersion:boolean = true;
  percent:number = 73;
  exampleData: ExpenseCategory[] = [];
}
