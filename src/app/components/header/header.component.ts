import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() extendedFunctionality:boolean = false;
  @Input() isDisplayPage:boolean = false;
  @Input() integrationName?:string;
  @Input() integrationId?:number;
  @Input() imageSrc?:SafeUrl;
}
