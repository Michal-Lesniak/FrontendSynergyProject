import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private http: HttpClient) { }
	private headers = new HttpHeaders({ 'Content-Type': 'image/png', 'Accept': 'image/png' });

	getImageById(id: number) {
		return this.http.get(`http://localhost:8080/image/${id}`,
		 { responseType: 'blob' });
	}

}