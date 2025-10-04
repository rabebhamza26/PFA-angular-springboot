import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Reservation, ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './mes-reservations.component.html',
  styleUrl: './mes-reservations.component.css'
})
export class MesReservationsComponent implements OnInit {
    reservations: Reservation[] = [];
    utilisateurId = 3;
    reservationEnEdition: any | null = null; 
  
  
  
      constructor(
        private reservationService: ReservationService,
        private http: HttpClient, 
        private router: Router
      ) {}
  
      ngOnInit(): void {
        this.chargerReservations();
      }
  
      chargerReservations(): void {
        this.reservationService.getAllReservations().subscribe({
          next: (data) => {
            this.reservations = data.filter(r => r.utilisateur.id === this.utilisateurId);
          },
          error: () => {
            this.showErrorAlert('Erreur', 'Impossible de charger les réservations');
          }
        });
      }
  
      supprimer(id: number): void {
        Swal.fire({
          title: 'Confirmer la suppression',
          text: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.reservationService.deleteReservation(id).subscribe({
              next: () => {
                this.showSuccessAlert('Supprimé', 'Réservation supprimée avec succès');
                this.chargerReservations();
              },
              error: () => {
                this.showErrorAlert('Erreur', 'Échec de la suppression');
              }
            });
          }
        });
      }
  
      modifier(reservation: Reservation): void {
        this.reservationEnEdition = { ...reservation };
      }
  
      annulerEdition(): void {
        Swal.fire({
          title: 'Annuler les modifications',
          text: "Voulez-vous vraiment annuler sans sauvegarder ?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, annuler',
          cancelButtonText: 'Non, continuer'
        }).then((result) => {
          if (result.isConfirmed) {
            this.reservationEnEdition = null;
          }
        });
      }
  
      enregistrerModification(): void {
        if (this.reservationEnEdition?.id) {
          this.reservationService.updateReservation(this.reservationEnEdition.id, this.reservationEnEdition)
            .subscribe({
              next: () => {
                this.showSuccessAlert('Succès', 'Réservation modifiée avec succès');
                this.reservationEnEdition = null;
                this.chargerReservations();
              },
              error: () => {
                this.showErrorAlert('Erreur', 'Échec de la modification');
              },
            });
        }
      }
  
      private showSuccessAlert(title: string, text: string): void {
        Swal.fire({
          title,
          text,
          icon: 'success',
          confirmButtonColor: '#28a745',
          timer: 2000,
          timerProgressBar: true
        });
      }
  
      private showErrorAlert(title: string, text: string): void {
        Swal.fire({
          title,
          text,
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
  }
  