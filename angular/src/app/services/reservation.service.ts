import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reservation {
  id?: number;
  dateDebut: string;
  dateFin: string;
  statut?: string;
  utilisateur: { id: number };
  salle: { id: number ; nom?: string;};
}





@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/post/create`, reservation);
  }

  
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  

  annulerReservation(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/annuler/${id}`, {});
  }
  confirmerReservation(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/confirmer/${id}`, {});
  }
  
}
