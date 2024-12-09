import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from './register/register-request.model';
import { LoginRequest } from './login/login-request.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Authentication`;

  constructor(private http: HttpClient, private router: Router) { }


  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/Authentication/register`, registerRequest);
  }
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/Authentication/login`, loginRequest);
  }
  logout() {
    localStorage.removeItem('authToken'); // Remove the stored token or session data
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
