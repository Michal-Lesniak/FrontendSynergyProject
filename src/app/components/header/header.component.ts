import { Component } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() extendedFunctionality:boolean = false;
  @Input() integrationName?:string;
}
