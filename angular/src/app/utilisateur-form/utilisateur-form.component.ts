import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Utilisateur, UtilisateurService } from '../services/utilisateur.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './utilisateur-form.component.html',
  styleUrl: './utilisateur-form.component.css'
})
export class UtilisateurFormComponent implements OnInit {
  utilisateur: Utilisateur = { nomUtilisateur: '', email: '', password: '', role: 'EMPLOYEE' };
  isEditMode: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.utilisateurService.getById(+id).subscribe(data => {
        this.utilisateur = data;
      });
    }
  }

  onSubmit(): void {
    const action = this.isEditMode ? 'mettre à jour' : 'créer';
    
    Swal.fire({
      title: `Voulez-vous vraiment ${action} cet utilisateur ?`,
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Oui, ${action}`,
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isEditMode) {
          this.utilisateurService.update(this.utilisateur.id!, this.utilisateur).subscribe({
            next: () => {
              Swal.fire(
                'Mis à jour !',
                'L\'utilisateur a été mis à jour avec succès.',
                'success'
              ).then(() => {
                this.router.navigate(['/liste']);
              });
            },
            error: (err) => {
              Swal.fire(
                'Erreur !',
                'Une erreur est survenue lors de la mise à jour.',
                'error'
              );
            }
          });
        } else {
          this.utilisateurService.create(this.utilisateur).subscribe({
            next: () => {
              Swal.fire(
                'Créé !',
                'L\'utilisateur a été créé avec succès.',
                'success'
              ).then(() => {
                this.router.navigate(['/']);
              });
            },
            error: (err) => {
              Swal.fire(
                'Erreur !',
                'Une erreur est survenue lors de la création.',
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
      text: "Les modifications non enregistrées seront perdues !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Non, continuer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/listeEmployee']);
      }
    });
  }
}