import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseSubCategory } from 'src/app/models/expense-sub-category';

@Injectable({
	providedIn: 'root'
})
export class SubcategoryService {

	constructor(private http: HttpClient) { }

	addSubcategory(category_id: number, subcategory: ExpenseSubCategory): Observable<any> {
		return this.http.post(`http://localhost:8080/category/${category_id}/subcategory`,
			JSON.stringify(subcategory),
			{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
	}

	deleteSubCategory(subCategory_id: number){
		return this.http.delete(`http://localhost:8080/subcategory/${subCategory_id}`);
	}
}
