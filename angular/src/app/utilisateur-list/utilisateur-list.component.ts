import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Utilisateur, UtilisateurService } from '../services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,RouterOutlet],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  

  constructor(
    private utilisateurService: UtilisateurService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: () => {
        this.showErrorAlert('Erreur', 'Impossible de charger la liste des utilisateurs');
      }
    });
  }

  supprimerUtilisateur(id: number | undefined): void {
    if (id === undefined) {
      this.showErrorAlert('Erreur', 'ID utilisateur invalide');
      return;
    }
  
    Swal.fire({
      title: 'Confirmer la suppression',
      text: "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/assets/images/trash-icon.png")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateurService.delete(id).subscribe({
          next: () => {
            this.showSuccessToast('Utilisateur supprimé');
            this.chargerUtilisateurs();
          },
          error: () => {
            this.showErrorAlert('Erreur', 'Échec de la suppression');
          }
        });
      }
    });
  }

  modifierUtilisateur(utilisateur: Utilisateur): void {
    Swal.fire({
      title: 'Modifier l\'utilisateur',
      text: `Vous allez modifier ${utilisateur.nomUtilisateur}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/ModifierEmployee', utilisateur.id]);
      }
    });
  }

  private showSuccessToast(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    
    Toast.fire({
      icon: 'success',
      title: message
    });
  }

  private showErrorAlert(title: string, message: string): void {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33'
    });
  }
}