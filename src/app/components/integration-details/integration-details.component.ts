import { Component } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ExpenseCategory } from 'src/app/models/expense-category';


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
export class IntegrationDetailsComponent {
  integrationName:string = "Integracja 2023";
  inputNameVersion:boolean = true;
  percent:number = 73;
  exampleData: ExpenseCategory[] = [];
}
