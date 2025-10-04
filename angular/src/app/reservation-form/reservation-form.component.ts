import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { Reservation, ReservationService } from '../services/reservation.service';
import { Salle, SalleService } from '../services/salle.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent  implements OnInit {
    salles: Salle[] = [];
    reservation: Reservation = {
     
      dateDebut: '',
      dateFin: '',
      utilisateur: { id: 3 }, 
      salle: { id: 0 }
    };


    constructor(
      private reservationService: ReservationService,
      private salleService: SalleService,
      private http: HttpClient
    ) {}
  
    ngOnInit(): void {
      this.salleService.getAllSalles().subscribe(data => {
        this.salles = data;
      });
    }
  
    onSubmit(): void {
      this.reservation.dateDebut = new Date(this.reservation.dateDebut).toISOString();
      this.reservation.dateFin = new Date(this.reservation.dateFin).toISOString();
    
      console.log('Données envoyées :', this.reservation);
    
      this.reservationService.createReservation(this.reservation).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Réservation réussie',
              text: 'Votre réservation a bien été enregistrée.'
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Salle non disponible',
              text: 'Veuillez choisir une autre salle ou horaire.'
            });
          }
        },
        error: (err) => {
          console.error('Erreur lors de la réservation:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de la réservation. Veuillez réessayer plus tard.'
          });
        }
      });
    }
    
    

  }