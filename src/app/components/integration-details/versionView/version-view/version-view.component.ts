import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { VersionBudget } from 'src/app/models/versionBudget';


@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styleUrls: ['./version-view.component.css']
})
export class VersionViewComponent implements OnInit {
 
  @Input() version?: VersionBudget;
  @Input() tempView?: Boolean;
  @Output() duplicateEvent = new EventEmitter<VersionBudget>();
  showSubCategory = false;

  inputNameVersion:boolean = true;
 
  ngOnInit(): void {
    
  }

  duplicateVersion(){
    this.duplicateEvent.emit(this.version);
  }
}
