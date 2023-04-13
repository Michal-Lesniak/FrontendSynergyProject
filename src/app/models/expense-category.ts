import { ExpenseSubCategory } from "./expense-sub-category";

export interface ExpenseCategory {
    id?: number;
    name: string;
    fullCost: number;
    spendPercentOfBudgetCategory: number;
    listSubCategory?:Array<ExpenseSubCategory>;
}
