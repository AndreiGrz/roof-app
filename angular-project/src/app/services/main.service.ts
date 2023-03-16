import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

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

  getCulori(finisajId: number, grosimeId: string): Observable<{results: any[]}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('finisajId', finisajId);
    queryParams = queryParams.append('grosimeId', grosimeId);

    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getCulori`, {params: queryParams});
  }

  getPret(grosimeId: number): Observable<{results: any}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('grosimeId', grosimeId);

    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getPret`, {params: queryParams});
  }

  getAccesorii(infoTabla: any, infoDimensiuni: any, tipCalculator: string): Observable<{results: any}> {
    return this.http.post<{results: any}>(`${this.BASE_URL}/getAccesorii`, {infoTabla, infoDimensiuni, tipCalculator});
  }

  getAccesoriiSuplimentare(): Observable<{results: any[]}>{
    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getAccesoriiSuplimentare`);
  }
}

