import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppNotification, NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-notification-history',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './admin-notification-history.component.html',
  styleUrl: './admin-notification-history.component.css'
})
export class AdminNotificationHistoryComponent implements OnInit {
    notifications: AppNotification[] = [];

  
    constructor(private notificationService: NotificationService,
      private http: HttpClient
      ) {}
  
    ngOnInit(): void {
      this.loadAllNotifications();
    }
  
    loadAllNotifications(): void {
      this.notificationService.getAllNotifications().subscribe(data => {
        this.notifications = data;
      });
    }
  }
  
