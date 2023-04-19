import { SubcategoryService } from './../../../../services/subcategory/subcategory.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges, Version } from '@angular/core';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { VersionBudget } from 'src/app/models/versionBudget';
import { ExpenseSubCategory } from 'src/app/models/expense-sub-category';
import { CategoryService } from 'src/app/services/category/category.service';
import { VersionService } from 'src/app/services/version/version.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styleUrls: ['./version-view.component.css']
})
export class VersionViewComponent {

  @Input() version?: VersionBudget;
  @Input() tempView?: Boolean;
  @Output() duplicateEvent = new EventEmitter<VersionBudget>();;
  @Output() setMainVersionEvent = new EventEmitter<VersionBudget>();
  @Output() deleteVersionEvent = new EventEmitter<VersionBudget>();

  constructor(private subcategoryService: SubcategoryService,
    private categoryService:CategoryService,
    private versionService: VersionService) { }

  enableChangeNameVersion: boolean = true;

  duplicateVersion() {
    this.duplicateEvent.emit(this.version);
  }

  setMainVersion() {
    this.setMainVersionEvent.emit(this.version);
  }

  deleteVersion() {
    this.deleteVersionEvent.emit(this.version);
  }

  //search from version index of categoryList is equal currentCategory and add subcategory
  addSubCategory(current_category: ExpenseCategory) {

    const subCategory: ExpenseSubCategory = {
      name: current_category.nameSubCategory!,
      cost: current_category.costSubCategory!
    };

    this.subcategoryService.addSubcategory(current_category.id!, subCategory).subscribe(res => {
      current_category && current_category.subCategoryList!.push(res);
      current_category.spendPercentOfBudgetCategory = 0;
      current_category.subCategoryList!.forEach(element => {
        current_category.spendPercentOfBudgetCategory += element.cost / current_category.fullCost * 100;
      });
      firstValueFrom(this.categoryService.updateCategory(current_category));
    });


    console.log(current_category);
    current_category.nameSubCategory = '';
    current_category.costSubCategory = undefined;
  }

  updateVersion(){
    firstValueFrom(this.versionService.changeVersion(this.version!));
  }

  deleteSubCategory(category: ExpenseCategory, subCategory: ExpenseSubCategory) {
    this.subcategoryService.deleteSubCategory(subCategory.id!).subscribe();
    category.subCategoryList = category.subCategoryList!.filter(element => element.id != subCategory.id);
    category.spendPercentOfBudgetCategory = 0;
      category.subCategoryList!.forEach(element => {
        category.spendPercentOfBudgetCategory += element.cost / category.fullCost * 100;
      });
      firstValueFrom(this.categoryService.updateCategory(category));
  }
  //Obliczanie procentu Kategorii dziala tylko w Bazie jest Integer trzeba by bylo od nowa postawic baze
}
