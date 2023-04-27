import { JsonPipe } from '@angular/common';
import { Version } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NumberValueAccessor } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { concat, concatMap, delay, firstValueFrom, forkJoin, from, ignoreElements, map, take, tap } from 'rxjs';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { Integration } from 'src/app/models/integration';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { VersionService } from 'src/app/services/version/version.service';



@Component({
  selector: 'app-new-integration',
  templateUrl: './new-integration.component.html',
  styleUrls: ['./new-integration.component.css']
})
export class NewIntegrationComponent implements OnInit {

  constructor(private integrationService: IntegrationService,
    private versionService: VersionService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state!['integration'] != undefined){
      this.integration = this.router.getCurrentNavigation()?.extras.state!['integration'];
      this.version = this.router.getCurrentNavigation()?.extras.state!['integration'].versionList[0];
      sessionStorage.setItem("integrationName", this.integration.name);
      sessionStorage.setItem("integrationBudget", JSON.stringify(this.integration.budget));
      sessionStorage.setItem("integrationNoParticipant", JSON.stringify(this.integration.noOfMembers));
      sessionStorage.setItem("versionName", this.version.name);
      sessionStorage.setItem("listCategory", JSON.stringify(this.version.categoryList));
    }
     
    console.log(this.integration);
  }

  @ViewChild(MatTable) table?: MatTable<any>;

  integration!: IntegrationDetail;
  version!: VersionBudget;
  fileImage?: File;
  srcImage?: any;
  listCategory?: Array<ExpenseCategory> = [];


  nameCategory!: string;
  amountCategory!: number;
  percentCategory!: number;

  fileSelected?: boolean = false;
  showAddingCategory?: boolean = true;
  displayedColums: string[] = ['Category', 'Amount', 'Percent', 'Delete'];


  ngOnInit(): void {


    if (sessionStorage.getItem('listCategory') !== null) {
      this.listCategory = JSON.parse(sessionStorage.getItem("listCategory")!);
      console.log(this.listCategory);
    }

    if (sessionStorage.getItem('image') !== null) {
      fetch(sessionStorage.getItem('image')!)
        .then(response => response.blob())
        .then(blob => {
          this.fileImage = new File([blob], 'integration.png', { type: blob.type });
        });
    }


    this.integration = {
      name: sessionStorage.getItem('integrationName')!,
      budget: JSON.parse(sessionStorage.getItem('integrationBudget')!),
      noOfMembers: JSON.parse(sessionStorage.getItem('integrationNoParticipant')!)
    }

    this.version = {
      name: sessionStorage.getItem('versionName')!,
      percentOfSpendBudget: this.listCategory!.reduce((sum, category) => sum + category.fullCost, 0) / this.integration.budget * 100
    }

    this.srcImage = sessionStorage.getItem('image');
    if (this.srcImage != null) {
      this.fileSelected = true;
    }

    console.log(this.integration);
  }


  onFileSelected(event: any) {
    this.fileImage = event.target.files[0];
    if (this.fileImage) {
      if (this.fileImage.size / 1024 / 1024 > 2) {
        alert("File size exceeds 2 MB");
      }
      else {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileImage);
        reader.onload = () => {
          this.srcImage = reader.result as string;
          if (sessionStorage.getItem('image') != null) {
            sessionStorage.removeItem('image');
          }
          sessionStorage.setItem('image', this.srcImage);
        };
        this.fileSelected = true;
      }
    }
  }

  async createIntegrationAndNavigateToNextView() {
    try {
      this.integration = await firstValueFrom(this.integrationService.addIntegration(this.integration));
      this.version = await firstValueFrom(this.versionService.addVersion(this.integration.id!, this.version!));
      await firstValueFrom(this.imageService.addImage(this.integration.id!, this.fileImage!));
      forkJoin(this.listCategory!.map(val => this.categoryService.addCategory(this.version.id!, val))).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/integration/details'], { state: { id: this.integration.id } });
        sessionStorage.clear();
      }
      )
    } catch {
      alert("Error while sending data to server");
    }

  }


  addVersionNameToSessionStorage() {
    if (sessionStorage.getItem("versionName") !== null) {
      sessionStorage.removeItem("versionName");
    }
    sessionStorage.setItem("versionName", this.version.name);
  }

  addIntegrationBudgetToSessionStorage() {
    if (sessionStorage.getItem("integrationBudget") !== null) {
      sessionStorage.removeItem("integrationBudget");
    }
    sessionStorage.setItem("integrationBudget", JSON.stringify(this.integration.budget));
  }

  addIntegrationNoParticipantToSesstionStorage() {
    if (sessionStorage.getItem("integrationNoParticipant") !== null) {
      sessionStorage.removeItem("integrationNoParticipant");
    }
    sessionStorage.setItem("integrationNoParticipant", JSON.stringify(this.integration.noOfMembers));
  }


  addIntegrationNameToSessionStorage() {
    if (sessionStorage.getItem("integrationName") !== null) {
      sessionStorage.removeItem("integrationName");
    }
    sessionStorage.setItem("integrationName", this.integration.name);
  }

  addListCategoryToSessionStorage() {
    if (sessionStorage.getItem("listCategory") !== null) {
      sessionStorage.removeItem("listCategory");
    }
    sessionStorage.setItem("listCategory", JSON.stringify(this.listCategory));
  }

  addSpendPercentOfBudget() {
    if (sessionStorage.getItem("spendPercentOfBudget") !== null) {
      sessionStorage.removeItem("spendPercentOfBudget");
    }
    sessionStorage.setItem("spendPercentOfBudget", JSON.stringify(this.version.percentOfSpendBudget));
  }

  addCategory = () => {
    this.listCategory?.push({ name: this.nameCategory, fullCost: this.amountCategory, spendPercentOfBudgetCategory: 0 });
    this.version.percentOfSpendBudget = this.listCategory!.reduce((sum, category) => sum + category.fullCost, 0) / this.integration.budget * 100;
    this.addListCategoryToSessionStorage();
    this.addSpendPercentOfBudget();
    this.table?.renderRows();
    this.showAddingCategory = false;
    this.amountCategory = 0;
    this.percentCategory = 0;
    this.nameCategory = '';
  };

  deleteCategory = (category: ExpenseCategory) => {
    this.listCategory = this.listCategory?.filter(val => val != category);
  }


  updateValuesByBudget = () => {
    if (this.listCategory?.length != 0) {
      this.listCategory?.forEach(el => {
        el.spendPercentOfBudgetCategory = el.fullCost / this.integration.budget * 100;
      })
      this.addListCategoryToSessionStorage();
    }

  }

  updateValuesByCostCategory = () => {
    if (this.integration.budget >= 0) {
      this.percentCategory = this.amountCategory / this.integration.budget * 100;
    }
  }

  updateValuesByPercentCategory = () => {
    if (this.integration.budget >= 0) {
      this.amountCategory = this.percentCategory / 100 * this.integration.budget;
    }
  }

  disableCreate(): Boolean {
    if (this.integration &&
      this.listCategory &&
      !this.integration.name ||
      this.listCategory!.length <= 0 ||
      !this.version.name ||
      this.srcImage == null ||
      this.integration.budget <= 0 ||
      this.integration.noOfMembers <= 0) {
      return true;
    }
    return false;
  }
}


