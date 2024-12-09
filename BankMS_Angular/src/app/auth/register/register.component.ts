import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from './register-request.model';
//import { RegisterRequest } from '../register-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerRequest: RegisterRequest = new RegisterRequest();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.registerRequest).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Registration failed.';
      }
    );
  }
}

