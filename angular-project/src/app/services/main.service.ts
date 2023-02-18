import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private BASE_URL = 'http://localhost:3000/api/main';

  constructor(private http: HttpClient) {}
    
  getBrands(): Observable<{results: any[]}>{
    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getBrands`);
  }

  getModels(brandId: number): Observable<{results: any[]}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('brandId', brandId);

    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getModels`, {params: queryParams});
  }

  getFinisaje(modelId: number): Observable<{results: any[]}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('modelId', modelId);

    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getFinisaje`, {params: queryParams});
  }

  getGrosimi(finisajId: number): Observable<{results: any[]}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('finisajId', finisajId);

    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getGrosimi`, {params: queryParams});
  }
}

