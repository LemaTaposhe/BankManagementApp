import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from './login-request.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginRequest: LoginRequest = new LoginRequest();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Login failed.';
      }
    );
  }
}

