import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';


export interface expense {
  category: string;
  amount: number;
  percent: number;
}

const EXPENSES: expense[] = [
  { category: 'Hotel', amount: 10000, percent: 10 },
  { category: 'Transport', amount: 3000, percent: 3 },
  { category: 'Hotel', amount: 5000, percent: 5 },
  
  { category: 'Hotel', amount: 10000, percent: 10 },
  { category: 'Transport', amount: 3000, percent: 3 },
  { category: 'Hotel', amount: 5000, percent: 5 },
  
  { category: 'Hotel', amount: 10000, percent: 10 },
  { category: 'Transport', amount: 3000, percent: 3 },
  { category: 'Hotel', amount: 5000, percent: 5 },
  
];

@Component({
  selector: 'app-new-integration',
  templateUrl: './new-integration.component.html',
  styleUrls: ['./new-integration.component.css']
})
export class NewIntegrationComponent {
  nameBudget?:string;
  amountBudget?:number;
  percentBudget?:number;
  nameCategory?:string;
  amountCategory?:number;
  percentCategory?:number;
  showAddingCategory?:boolean = true;
  displayedColums: string[] = ['Category', 'Amount', 'Percent'];
  dataSource = EXPENSES;


  addCategory = () => {
    
  };
}
