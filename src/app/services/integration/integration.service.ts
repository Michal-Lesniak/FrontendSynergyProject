import { Integration } from './../../models/integration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  addIntegration(integration:IntegrationDetail): Observable<any>{
    return this.http.post(this.IntegrationsApiUrl, JSON.stringify(integration));
  }

}
