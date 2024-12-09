
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from './account.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = `${environment.apiBaseUrl}/Accounts`;

  constructor(private httpClient: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

 
  // Get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<any>(this.apiUrl, this.getHttpOptions())
      .pipe(
        map(response => response.$values),  // Extract the array from the response
        catchError(this.handleError)
      );
  }
  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

 
  // Apply for a new account
  applyForAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/apply`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Update an account
  updateAccount(id: number, account: Account): Observable<Account> {
    return this.httpClient.put<Account>(`${this.apiUrl}/${id}`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
 
  closeAccount(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError('Error occurred while processing request');
  }
}
