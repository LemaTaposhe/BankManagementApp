import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from './login-request.model'; // Make sure this is properly defined
import { AuthService } from '../auth.service';

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
    // Pass email and password separately
    this.authService.login(this.loginRequest.email, this.loginRequest.password).subscribe(
      (response) => {
        // Store the JWT token in localStorage
        this.authService.saveToken(response.token);
        // Redirect to the home page or dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
