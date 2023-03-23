import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTable } from '@angular/material/table';


export interface expense {
  category: string;
  amount: number;
  percent: number;
}

export const EXPENSES: expense[] = [
  {category: "Hotel", amount: 20000, percent: 40},
  {category: "Food", amount: 10000, percent: 20},
  {category: "Transport", amount: 5000, percent: 10},
];

@Component({
  selector: 'app-new-integration',
  templateUrl: './new-integration.component.html',
  styleUrls: ['./new-integration.component.css']
})
export class NewIntegrationComponent {

  @ViewChild(MatTable) table?: MatTable<any>;

  nameBudget!:string;
  amountBudget!:number;
  noParticipant!:number;
  nameCategory!:string;
  amountCategory!:number;
  percentCategory!:number;
  showAddingCategory?:boolean = true;
  displayedColums: string[] = ['Category', 'Amount', 'Percent'];
  dataSource = EXPENSES;


  updateValuesByBudget = () => {
    this.percentCategory = this.amountCategory/this.amountBudget * 100;
  }

  updateValuesByCostCategory = () => {
    this.percentCategory = this.amountCategory/this.amountBudget * 100;
  }

  updateValuesByPercentCategory = () => {
    this.amountCategory = this.percentCategory/100 * this.amountBudget;
  }

  addCategory = () => {
    EXPENSES.push({category: this.nameCategory, amount: this.amountCategory, percent: this.percentCategory})
    this.table?.renderRows();
    this.showAddingCategory = false;
  };
}
