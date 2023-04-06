import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseCategory } from 'src/app/models/expense-category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    addCategory(version_id: number, category: ExpenseCategory): Observable<any> {
        return this.http.post("http://localhost:8080/version/" + version_id + "/category",
         JSON.stringify(category),
         {headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }
}
