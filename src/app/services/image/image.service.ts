import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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


	addImage(integration_id: number, file: File):Observable<any> {
		const fileImage = new FormData();
		fileImage.append('image', file);
		return this.http.post(`http://localhost:8080/integration/${integration_id}/image`,fileImage);
	}

}