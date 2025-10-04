import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Salle {
  id?: number;
  nom: string;
  capacite: number;
  equipements: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:8080/api/salles';

  constructor(private http: HttpClient) {}

getAllSalles(): Observable<Salle[]> {
  return this.http.get<Salle[]>(`${this.apiUrl}/getAll`);
}

  

  getSalle(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/get/${id}`);
  }

  addSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}/post`, salle);
  }

  updateSalle(id: number, salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/update/${id}`, salle);
  }

  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}