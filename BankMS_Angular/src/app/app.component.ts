//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})
//export class AppComponent {
//  title = 'BankMS_Angular';
//}
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
//import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bank Management System';

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Check if token exists
  }
}
