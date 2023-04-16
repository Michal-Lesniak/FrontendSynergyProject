import { ExpenseSubCategory } from "./expense-sub-category";

export interface ExpenseCategory {
    id?: number;
    showSubcategory?: Boolean; //Neeeded to showe subcategory in the versionViewComponent
    name: string;
    fullCost: number;
    spendPercentOfBudgetCategory: number;
    subCategoryList?:Array<ExpenseSubCategory>;
}
