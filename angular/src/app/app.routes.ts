import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNotificationHistoryComponent } from './admin-notification-history/admin-notification-history.component';
import { ConsulterDisponibilitesDesSallesComponent } from './consulter-disponibilites-des-salles/consulter-disponibilites-des-salles.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { NotificationComponent } from './notification/notification.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { SalleFormComponent } from './salle-form/salle-form.component';
import { SalleListComponent } from './salle-list/salle-list.component';
import { UtilisateurFormComponent } from './utilisateur-form/utilisateur-form.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';

export const routes: Routes = [
    {path:'listeEmployee', component:UtilisateurListComponent},
    {path:'AjouterEmployee', component:UtilisateurFormComponent},
    { path: 'ModifierEmployee/:id', component: UtilisateurFormComponent },
    { path: 'login', component: LoginComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: '', redirectTo: 'listeSalle', pathMatch: 'full' },

    {path:'listeSalle',component:SalleListComponent},
  { path: 'sallesajouter', component: SalleFormComponent },
  { path: 'sallesmodifier/:id', component: SalleFormComponent },

  { path: 'listereservations', component: ReservationListComponent },
  { path: 'demandereservations', component: ReservationFormComponent },


  { path: 'dashboardemployee', component: EmployeeDashboardComponent },
  { path: 'dashboardadmin', component: AdminDashboardComponent },

  { path: 'consulterdisponibilite', component: ConsulterDisponibilitesDesSallesComponent },
  { path: 'mesreservation', component: MesReservationsComponent },


 
  
  { path: 'historiquenotifications', component: AdminNotificationHistoryComponent },
  
  { path: 'notifications', component: NotificationComponent },


  
    
];
