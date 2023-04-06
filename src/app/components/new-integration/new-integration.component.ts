import { JsonPipe } from '@angular/common';
import { Version } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NumberValueAccessor } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { concatMap, from, take } from 'rxjs';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { Integration } from 'src/app/models/integration';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';
import { CategoryService } from 'src/app/services/category/category.service';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { VersionService } from 'src/app/services/version/version.service';



@Component({
  selector: 'app-new-integration',
  templateUrl: './new-integration.component.html',
  styleUrls: ['./new-integration.component.css']
})
export class NewIntegrationComponent implements OnInit{

  constructor(private integrationService:IntegrationService,
     private versionService:VersionService,
     private categoryService:CategoryService){

  }

  @ViewChild(MatTable) table?: MatTable<any>;

  integration!:IntegrationDetail;
  version?:VersionBudget;
  srcImage?:any;
  listCategory?: ExpenseCategory[] = [];

  nameVersion!:string;
  percentOfSpendBudget:number = 88;
  
  noParticipant!:number;
  integrationBudget!:number;
  integrationName!:string

  nameCategory!:string;
  amountCategory!:number;
  percentCategory!:number;

  showAddingCategory?:boolean = true;
  displayedColums: string[] = ['Category', 'Amount', 'Percent'];
  

  ngOnInit(): void {
    if(sessionStorage.getItem('listCategory') !== null ){
      this.listCategory = JSON.parse(sessionStorage.getItem("listCategory")!);
    }
    this.integrationName = sessionStorage.getItem('integrationName')!;
    this.integrationBudget = JSON.parse(sessionStorage.getItem('integrationBudget')!);
    this.noParticipant = JSON.parse(sessionStorage.getItem('integrationNoParticipant')!);
    this.nameVersion = sessionStorage.getItem('versionName')!;
  }


  createIntegration() {
    this.integration = {
      name: this.integrationName,
      budget: this.integrationBudget,
      noOfMembers: this.noParticipant
    }

    this.version = {
      name: this.nameVersion,
      percentOfSpendBudget: this.percentOfSpendBudget
    }

    //Check!!!!!!!!!!!!!!!!!!!!
    this.integrationService.addIntegration(this.integration).pipe(
      take(1),
      concatMap((res) => {
        this.integration.id = res.id;
        return this.versionService.addVersion(this.integration.id!, this.version!).pipe(take(1), concatMap((resv2) => {
          this.version!.id = resv2.id;
          return from(this.listCategory!).pipe(
            concatMap((val) => this.categoryService.addCategory(this.version!.id!, val).pipe(take(1)))
          );
        }));
      }),
      
    ).subscribe();
    //Check!!!!!!!!!!!!!!!!!!!! Wrong id to upload category!!!
    
    // this.integrationService.addIntegration(this.integration).pipe(take(1)).subscribe(
    //   res=> {
    //     this.integration.id = res.id;
    //   }
    // );

    // this.integration.id && this.versionService.addVersion(this.integration.id, this.version).pipe(take(1)).subscribe(
    //   res => {
    //     this.version && (this.version.id = res.id);
    //   }
    // );

    // this.listCategory?.forEach(val =>
    //   this.version?.id && this.categoryService.addCategory(this.version.id ,val));


    //   sessionStorage.clear();
    }


  addVersionNameToSessionStorage(){
    if(sessionStorage.getItem("versionName") !== null ){
      sessionStorage.removeItem("versionName");
    }
    sessionStorage.setItem("versionName", this.nameVersion);
  }

  addIntegrationBudgetToSessionStorage(){
    if(sessionStorage.getItem("integrationBudget") !== null ){
      sessionStorage.removeItem("integrationBudget");
    }
    sessionStorage.setItem("integrationBudget", JSON.stringify(this.integrationBudget));
  }

  addIntegrationNoParticipantToSesstionStorage(){
    if(sessionStorage.getItem("integrationNoParticipant") !== null ){
      sessionStorage.removeItem("integrationNoParticipant");
    }
    sessionStorage.setItem("integrationNoParticipant", JSON.stringify(this.noParticipant));
  }


  addIntegrationNameToSessionStorage() {
    if(sessionStorage.getItem("integrationName") !== null){
      sessionStorage.removeItem("integrationName");
    }
    sessionStorage.setItem("integrationName", this.integrationName);
  }

  addListCategoryToSessionStorage(){
    if(sessionStorage.getItem("listCategory") !== null){ 
      sessionStorage.removeItem("listCategory");
    }
    sessionStorage.setItem("listCategory", JSON.stringify(this.listCategory));
  }

  addCategory = () => {
    this.listCategory?.push({name: this.nameCategory, fullCost: this.amountCategory, spendPercentOfBudgetCategory: this.percentCategory});
    this.addListCategoryToSessionStorage();
    this.table?.renderRows();
    this.showAddingCategory = false;
    this.amountCategory = 0;
    this.percentCategory = 0;
    this.nameCategory = '';
  }; 


  updateValuesByBudget = () => {
    this.percentCategory = this.amountCategory/this.integrationBudget * 100;
  }

  updateValuesByCostCategory = () => {
    this.percentCategory = this.amountCategory/this.integrationBudget * 100;
  }

  updateValuesByPercentCategory = () => {
    this.amountCategory = this.percentCategory/100 * this.integrationBudget;
  }

}
