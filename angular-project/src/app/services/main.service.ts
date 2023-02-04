import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private BASE_URL = 'http://localhost:3000/api/main';

  constructor(private http: HttpClient) {}
    
  get(): Observable<{message: string}>{
    return this.http.get<{message: string}>(`${this.BASE_URL}/get`);
  }
}
