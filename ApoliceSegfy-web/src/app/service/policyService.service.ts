import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../model/policy';

@Injectable({
    providedIn: 'root'
  })
export class PolicyServiceService {
url = 'http://localhost:5000/Apolice';

constructor(private http: HttpClient) { }

  public getPolicys(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.url);
  }

  public getPolicy(id: number): Observable<Policy> {
    return this.http.get<Policy>(this.url + '/' + id);
  }

  public postPolicy(policy: Policy) {
    return this.http.post(this.url, policy);
  }
}
