import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { Salle, SalleService } from '../services/salle.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-consulter-disponibilites-des-salles',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './consulter-disponibilites-des-salles.component.html',
  styleUrl: './consulter-disponibilites-des-salles.component.css'
})
export class ConsulterDisponibilitesDesSallesComponent implements OnInit {
     salles: Salle[] = [];
    dateDebut: string = '';
    dateFin: string = '';

    constructor(
      private salleService: SalleService,
      private reservationService: ReservationService,
      private http: HttpClient
    ) {}
  
    ngOnInit(): void {
      this.salleService.getAllSalles().subscribe({
        next: (data) => this.salles = data,
        error: (err) => this.showErrorAlert('Erreur de chargement', 'Impossible de charger la liste des salles')
      });
    }
  
    verifierDisponibilite(salle: Salle): void {
      if (!this.dateDebut || !this.dateFin) {
        this.showWarningAlert('Champs requis', 'Veuillez sélectionner une date de début et une date de fin.');
        return;
      }
    
      const debut = new Date(this.dateDebut).toISOString();
      const fin = new Date(this.dateFin).toISOString();
    
      this.reservationService.getAllReservations().subscribe({
        next: (reservations) => {
          const occupee = reservations.some(r =>
            r.salle.id === salle.id &&
            r.statut !== 'ANNULEE' &&
            (r.dateDebut < fin && r.dateFin > debut)
          );
          
          this.showAvailabilityAlert(salle.nom, occupee);
        },
        error: (err) => this.showErrorAlert('Erreur', 'Impossible de vérifier la disponibilité')
      });
    }
    
    private showWarningAlert(title: string, text: string): void {
      Swal.fire({
        icon: 'warning',
        title,
        text,
        confirmButtonColor: '#3085d6',
      });
    }
    
    private showErrorAlert(title: string, text: string): void {
      Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#d33',
      });
    }
    
    private showAvailabilityAlert(salleNom: string, occupee: boolean): void {
      Swal.fire({
        title: 'Disponibilité de la salle',
        html: `La salle <b>${salleNom}</b> est <b style="color:${occupee ? '#d33' : '#28a745'}">${occupee ? 'OCCUPÉE' : 'DISPONIBLE'}</b> entre ${this.formatDate(this.dateDebut)} et ${this.formatDate(this.dateFin)}`,
        icon: occupee ? 'error' : 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: occupee ? '#d33' : '#28a745',
        showCancelButton: true,
        cancelButtonText: 'Fermer',
        footer: occupee ? '<a href>Voir les détails de réservation</a>' : ''
      });
    }
    
    private formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
}