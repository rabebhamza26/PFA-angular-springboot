import { CommonModule } from '@angular/common';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Reservation, ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,RouterOutlet,],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
    reservations: Reservation[] = [];

  

    constructor(
      private reservationService: ReservationService,
      private router: Router ,
      private http: HttpClient

    ) {}
    
  
    ngOnInit(): void {
      this.getReservations();
    }
  
    getReservations(): void {
      this.reservationService.getAllReservations().subscribe((data: Reservation[]) => {
        this.reservations = data;
      });
    }

    
    
    confirmerReservation(id: number) {
      this.reservationService.confirmerReservation(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Réservation confirmée',
            confirmButtonColor: '#3085d6'
          });
          this.getReservations(); 
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la confirmation',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
    
    
    annulerReservation(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment annuler cette réservation ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, annuler',
    cancelButtonText: 'Non',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      this.reservationService.annulerReservation(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Annulée',
            text: 'Réservation annulée avec succès',
            confirmButtonColor: '#3085d6'
          });
          this.getReservations();
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l\'annulation',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  });
}

    
  }
  