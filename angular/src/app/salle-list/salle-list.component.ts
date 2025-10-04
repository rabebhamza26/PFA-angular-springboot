import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Salle, SalleService } from '../services/salle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salle-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,RouterOutlet],
  templateUrl: './salle-list.component.html',
  styleUrl: './salle-list.component.css'
})
export class SalleListComponent implements OnInit {
  salles: Salle[] = [];

  constructor(
    private salleService: SalleService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.chargerSalles();
  }

  chargerSalles(): void {
    this.salleService.getAllSalles().subscribe(data => {
      this.salles = data;
    });
  }

  supprimerSalle(id: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette salle ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salleService.deleteSalle(id).subscribe(() => {
          Swal.fire(
            'Supprimé !',
            'La salle a été supprimée avec succès.',
            'success'
          );
          this.chargerSalles();
        });
      }
    });
  }

  modifierSalle(salle: Salle): void {
    this.router.navigate(['/sallesmodifier', salle.id]);
  }
}