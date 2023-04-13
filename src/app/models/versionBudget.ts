import { ExpenseCategory } from "./expense-category";

export interface VersionBudget {
    id?:number;
    name: string;
    percentOfSpendBudget: number;
    categoryList?:Array<ExpenseCategory>;
}
