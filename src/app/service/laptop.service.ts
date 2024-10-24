import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Laptop } from '../model/laptop';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  private apiUrl = 'http://localhost:3000/laptops';

  constructor(private http: HttpClient) {}

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getLaptopById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addLaptop(laptop: Laptop): Observable<any> {
    //return this.http.post(this.apiUrl, laptop);  // USAR CON BASE DE DATOS
    // Nota: SOLO CUANDO SE TRABAJA CON JSON-SERVER
    let laptops = this.getLaptops()
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((laptops: Laptop[]) => {
        // Obtener el último ID numérico
        const lastId = laptops.length > 0 ? Math.max(...laptops.map(l => l.id)) : 0;
        // Asignar el nuevo ID como numérico y secuencial
        laptop.id = lastId + 1;
        return laptop;
      }),
      // Hacer la petición POST con el nuevo laptop
      switchMap(newLaptop => this.http.post(this.apiUrl, newLaptop))
    );
    //*/
  }

  updateLaptop(id: number, laptop: Laptop): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, laptop);
  }

  deleteLaptop(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}