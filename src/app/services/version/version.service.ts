import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionBudget } from 'src/app/models/versionBudget';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  
  constructor(private http:HttpClient) { }

  getVersionFromIntegration(integration_id:number): Observable<VersionBudget[]>{
    return this.http.get<VersionBudget[]>("http://localhost:8080/integration/" + integration_id + "/version")
  }

  addVersion(integration_id:number, version:VersionBudget): Observable<any>{
    return this.http.post<VersionBudget>("http://localhost:8080/integration/" + integration_id + "/version",
     JSON.stringify(version),
     {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  deleteVersion(version_id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/version/" + version_id);
  }

  changeVersion(version: VersionBudget): Observable<any> {
    return this.http.put<any>("http://localhost:8080/version/" + version.id,
     JSON.stringify(version),
     {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }


}
