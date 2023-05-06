import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
    
  getBrands(): Observable<{results: any[]}>{
    return this.http.get<{results: any[]}>(`${this.BASE_URL}/getBrands`);
  }

  // getBrands(): Observable<{results: any[]}>{
  //   return this.http.get<{results: any[]}>(`https://calculator.tabla-online.ro/api/main/getBrands`);
  // }

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

  sendEmail(list: any, userInfo: any, models: any, measurements: any, tipCalculator: string): Observable<{results: any}> {
    return this.http.post<{results: any}>(`${this.BASE_URL}/sendEmail`, {list, userInfo, models, measurements, tipCalculator});
  }

  getOferta(id: string): Observable<{results: any}> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);

    return this.http.get<{results: any}>(`${this.BASE_URL}/getOferta`, {params: queryParams});
  }

  setRoofModel(obj: any): Observable<any> {
    return this.http.post<{obj: string}>(`${this.BASE_URL}/setRoofModel`, {obj});
  }
}

