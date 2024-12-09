
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.model'; // Assuming user.model.ts is in the same folder
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.apiBaseUrl + '/User';

  constructor(private httpClient: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Get token from localStorage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

 
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<any>(`${this.url}/GetUsers`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError), // Error handling
        // Extract `data` array from the response
        map(response => response.$values || [])
      );
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/GetUser/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/InsertUser`, user, this.getHttpOptions())
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/UpdateUser/${id}`, user, this.getHttpOptions())
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  deleteUserById(id: number): Observable<number> {
    return this.httpClient.delete<number>(`${this.url}/DeleteUser/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  private handleError(error: any) {
    // Custom error handling
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
