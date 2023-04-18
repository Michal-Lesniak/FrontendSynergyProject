import { SubcategoryService } from './../../../../services/subcategory/subcategory.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges, Version } from '@angular/core';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { VersionBudget } from 'src/app/models/versionBudget';


@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styleUrls: ['./version-view.component.css']
})
export class VersionViewComponent{
 
  @Input() version?: VersionBudget;
  @Input() tempView?: Boolean;
  @Output() duplicateEvent = new EventEmitter<VersionBudget>();
  @Output() addSubCategoryEvent = new EventEmitter<ExpenseCategory>();
  @Output() setMainVersionEvent = new EventEmitter<VersionBudget>();
  @Output() deleteVersionEvent = new EventEmitter<VersionBudget>();

  enableChangeNameVersion:boolean = true;

  duplicateVersion(){
    this.duplicateEvent.emit(this.version);
  }

  //search from version index of categoryList is equal currentCategory and add subcategory
  addSubCategory(current_category:ExpenseCategory){
    
    current_category && current_category.subCategoryList!.push({
      name: current_category.nameSubCategory!,
      cost: current_category.costSubCategory!
    })
    current_category.spendPercentOfBudgetCategory = 0;
    current_category.subCategoryList!.forEach(element => {
            current_category.spendPercentOfBudgetCategory += element.cost/current_category.fullCost * 100;
    });
    console.log(current_category);
    current_category.nameSubCategory = '';
    current_category.costSubCategory = undefined;
    this.addSubCategoryEvent.emit(current_category);
  }

  setMainVersion(){
    this.setMainVersionEvent.emit(this.version);
  }

  deleteVersion(){
    this.deleteVersionEvent.emit(this.version);
  }


}
