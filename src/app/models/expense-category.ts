import { ExpenseSubCategory } from "./expense-sub-category";

export interface ExpenseCategory {
    id?: number;
    showSubcategory?: Boolean; //Neeeded to showe subcategory in the versionViewComponent
    nameSubCategory?: string;
    costSubCategory?: number;
    name: string;
    fullCost: number;
    spendPercentOfBudgetCategory: number;
    subCategoryList?:Array<ExpenseSubCategory>;
}
