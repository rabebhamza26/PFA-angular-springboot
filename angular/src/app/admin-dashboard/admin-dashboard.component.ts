import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  {
  @ViewChild(RouterOutlet) routerOutlet?: RouterOutlet;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion:', err);
        this.authService.clearSession();
      }
    });
  }
}