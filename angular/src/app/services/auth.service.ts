import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/utilisateurs/login';
  private apiUrll = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient, private router: Router) { }

 

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrll}/logout`, {});
  }

  clearSession(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('sessionData');
    this.router.navigate(['/login']);
  }

  
}

