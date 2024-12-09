
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

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.apiUrl, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  applyForAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/apply`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.httpClient.put<Account>(`${this.apiUrl}/${id}`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  closeAccount(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/close/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError('Error occurred while processing request');
  }
}
