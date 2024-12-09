//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
//export class LoanService {

//  constructor() { }
//}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Loan } from './loan.model'; // Assuming your Loan model is in the same directory
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl: string = `${environment.apiBaseUrl}/Loans`;

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

  // Get all loans
  getAllLoans(): Observable<Loan[]> {
    return this.httpClient.get<any>(this.apiUrl, this.getHttpOptions())
      .pipe(
        map(response => response.$values),  // Adjust as per the response format
        catchError(this.handleError)
      );
  }
  //getAllLoans(): Observable<Loan[]> {
  //  return this.httpClient.get<Loan[]>(`${this.apiUrl}/Loans`);
  //}
  // Get a specific loan by ID
  getLoanById(id: number): Observable<Loan> {
    return this.httpClient.get<Loan>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Apply for a loan
  applyForLoan(loan: Loan): Observable<Loan> {
    return this.httpClient.post<Loan>(`${this.apiUrl}/apply`, loan, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Approve or reject a loan
  approveLoan(id: number, isApproved: boolean): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/${id}/approve?isApproved=${isApproved}`, {}, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Repay a loan
  repayLoan(id: number, repaymentAmount: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/${id}/repay`, { repaymentAmount }, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Calculate penalty for overdue payments
  calculatePenalty(id: number, overdueDays: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}/penalty?overdueDays=${overdueDays}`, this.getHttpOptions())
      .pipe(
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
