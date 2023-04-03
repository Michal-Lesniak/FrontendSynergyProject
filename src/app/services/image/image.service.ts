import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly imageApiUrl: string = "http://localhost:8080/image";
  imageSrc?:any;
  constructor(private http: HttpClient, private sanitizer:DomSanitizer) { }

  getImageById(id:number) {
    this.http.get(this.imageApiUrl + "/" + id, { responseType: 'blob'}).subscribe(data => {
      console.log(data);
      const blob = new Blob([data], { type: 'blob' }); // Create a Blob object from the image data
      const url = window.URL.createObjectURL(blob); // Generate a URL for the Blob object
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(url); // Set the URL as the source of an <img> element
    });
  }
}
