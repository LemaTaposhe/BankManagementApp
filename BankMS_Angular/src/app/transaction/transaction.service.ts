//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
//export class TransactionService {

//  constructor() { }
//}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Transaction } from './transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  deposit(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/deposit`, transaction);
  }

  withdraw(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/withdraw`, transaction);
  }

  transfer(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transfer`, transaction);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  // Get all transactions
  //getAllTransactions(): Observable<Transaction[]> {
  //  return this.http.get<Transaction[]>(this.apiUrl);
  //}
  // Get all accounts
  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Get token from localStorage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<any>(this.apiUrl, this.getHttpOptions())
      .pipe(
        map(response => response.$values),  // Extract the array from the response
        catchError(this.handleError)
      );
  }
  // Get transactions by account ID
  //getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
  //  return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  //}
  // Get a specific account by ID
  //getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
  //  return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`, this.getHttpOptions())
  //    .pipe(
  //    /*catchError(this.handleError)*/
  //      map(response => response.$values),  // Extract the array from the response
  //      catchError(this.handleError)
  //    );
  //}
  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.http.get<{ $values: Transaction[] }>(`${this.apiUrl}/account/${accountId}`, this.getHttpOptions())
      .pipe(
        map(response => response.$values),  // Extract the `$values` property
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
