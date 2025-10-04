import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Salle, SalleService } from '../services/salle.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-salle-form',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './salle-form.component.html',
  styleUrl: './salle-form.component.css'
})
export class SalleFormComponent implements OnInit {
    salle: Salle = {
      nom: '',
      capacite: 0,
      equipements: ''
    };
  
    isEditMode = false;

    constructor(
      private salleService: SalleService,
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
    ) {}
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isEditMode = true;
        this.salleService.getSalle(+id).subscribe(data => this.salle = data);
      }
    }
  
    onSubmit(): void {
      const action = this.isEditMode ? 'mettre à jour' : 'ajouter';
      
      Swal.fire({
        title: `Confirmer l'action`,
        text: `Voulez-vous vraiment ${action} cette salle ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Oui, ${action}`,
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.isEditMode) {
            this.salleService.updateSalle(this.salle.id!, this.salle).subscribe({
              next: () => {
                Swal.fire(
                  'Succès !',
                  'La salle a été mise à jour avec succès.',
                  'success'
                ).then(() => {
                  this.router.navigate(['/listeSalle']);
                });
              },
              error: (error) => {
                Swal.fire(
                  'Erreur !',
                  'Une erreur est survenue lors de la mise à jour de la salle.',
                  'error'
                );
              }
            });
          } else {
            this.salleService.addSalle(this.salle).subscribe({
              next: () => {
                Swal.fire(
                  'Succès !',
                  'La salle a été ajoutée avec succès.',
                  'success'
                ).then(() => {
                  this.router.navigate(['/listeSalle']);
                });
              },
              error: (error) => {
                Swal.fire(
                  'Erreur !',
                  'Une erreur est survenue lors de l\'ajout de la salle.',
                  'error'
                );
              }
            });
          }
        }
      });
    }
  
    annuler(): void {
      Swal.fire({
        title: 'Annuler les modifications ?',
        text: 'Les modifications non enregistrées seront perdues.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, annuler',
        cancelButtonText: 'Non, continuer'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/listeSalle']);
        }
      });
    }
  }