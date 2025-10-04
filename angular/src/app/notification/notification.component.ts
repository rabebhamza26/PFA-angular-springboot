import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppNotification, NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
    notifications: AppNotification[] = [];

    
  
    constructor(private notificationService: NotificationService,
      private http: HttpClient
      ) {}
  
    ngOnInit(): void {
      this.loadNotifications();
    }
  
    loadNotifications(): void {
      const userId = 2; // À adapter dynamiquement selon l'utilisateur connecté
      this.notificationService.getNotificationsByUserId(userId).subscribe(data => {
        this.notifications = data;
      });
    }
    
  }