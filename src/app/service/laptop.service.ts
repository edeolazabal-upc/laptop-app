import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  private apiUrl = 'http://localhost:3000/laptops';

  constructor(private http: HttpClient) {}

  getLaptops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getLaptopById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addLaptop(laptop: any): Observable<any> {
    return this.http.post(this.apiUrl, laptop);
  }

  updateLaptop(id: number, laptop: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, laptop);
  }

  deleteLaptop(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}