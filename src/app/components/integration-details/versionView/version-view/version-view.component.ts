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
  

  inputNameVersion:boolean = true;
  nameSubCategory: string = "";
  costSubCategory?: number;


  duplicateVersion(){
    this.duplicateEvent.emit(this.version);
  }

  //search from version index of categoryList is equal currentCategory and add subcategory
  addSubCategory(current_category:ExpenseCategory){
    
    current_category && current_category.subCategoryList!.push({
      name: this.nameSubCategory,
      cost: this.costSubCategory!
    })
    console.log(current_category);
    this.nameSubCategory = '';
    this.costSubCategory = undefined;
    this.addSubCategoryEvent.emit(current_category);
  }

}
