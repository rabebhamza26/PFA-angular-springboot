import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterOutlet,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, 
    private router: Router,
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Réponse de connexion:', response);
        
        Swal.fire({
          title: 'Connexion réussie!',
          text: response.message || 'Vous êtes maintenant connecté',
          icon: 'success',
          confirmButtonColor: '#3f51b5',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          // Redirection en fonction du mot de passe
          if (this.password === 'admin') {
            this.router.navigate(['/dashboardadmin']);
          } else if (this.password === 'EMPLOYEE') {
            this.router.navigate(['/dashboardemployee']);
          } else {
            this.router.navigate(['/listeEmployee']);
          }
        });

        this.errorMessage = '';
      },
      error => {
        console.error('Erreur de connexion:', error);
        
        Swal.fire({
          title: 'Erreur de connexion',
          text: error.error?.message || 'Nom d\'utilisateur ou mot de passe incorrect',
          icon: 'error',
          confirmButtonColor: '#f44336',
          confirmButtonText: 'OK'
        });

        this.successMessage = '';
      }
    );
  }
}

