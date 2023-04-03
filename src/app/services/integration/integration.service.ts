import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Integration } from 'src/app/models/integration';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { VersionBudget } from 'src/app/models/versionBudget';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  
  private readonly IntegrationsApiUrl = "http://localhost:8080/integration";

  constructor(private http:HttpClient) { }

  getIntegrations(): Observable<Integration[]>{
    return this.http.get<Integration[]>(this.IntegrationsApiUrl);
  };

  getIntegrationById(id:number): Observable<IntegrationDetail>{
    return this.http.get<IntegrationDetail>(this.IntegrationsApiUrl + "/" + id);
  }

  getVersionFromIntegration(id:number): Observable<VersionBudget[]>{
    return this.http.get<VersionBudget[]>(this.IntegrationsApiUrl + "/" + id + "/version")
  }


}
