
import { Component, OnInit } from '@angular/core';
import { LoanService } from './loan.service';
import { Loan } from './loan.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  loanForm!: FormGroup ; // Declare the loanForm of type FormGroup
  selectedLoan: Loan | null = null;
  repaymentAmount: number = 0;
  overdueDays: number = 0;
  penaltyAmount: number = 0;
  currentUser: User | null = null;
  users: User[] = []; // To store the list of users
  newLoan: Loan = new Loan(); // Declare the newLoan instance

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private routes: Router
  ) { }

  ngOnInit(): void {
    this.getAllLoans();
    this.loadCurrentUser();
    this.loadUsers();

    // Initialize the loan form with form controls and validations
    this.loanForm = this.formBuilder.group({
      userId: ['', Validators.required],
      principalAmount: ['', [Validators.required, Validators.min(1)]],
      interestRate: ['', [Validators.required, Validators.min(0)]],
      termMonths: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Load users from the database for the dropdown
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Get all loans
  getAllLoans(): void {
    this.loanService.getAllLoans().subscribe(
      (loans) => {
        this.loans = loans;
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  // Apply for a new loan
  applyForLoan(): void {
    if (this.loanForm?.valid) { // Use optional chaining to safely access loanForm
      this.newLoan.userId = this.loanForm.value.userId;
      this.newLoan.principalAmount = this.loanForm.value.principalAmount;
      this.newLoan.interestRate = this.loanForm.value.interestRate;
      this.newLoan.termMonths = this.loanForm.value.termMonths;

      this.loanService.applyForLoan(this.newLoan).subscribe(
        (response) => {
          const loan = response;
          this.loans.push(loan);
          this.loanForm?.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error applying for loan:', error);
        }
      );
    }
  }

  // Approve or reject a loan
  approveLoan(id: number, isApproved: boolean): void {
    this.loanService.approveLoan(id, isApproved).subscribe(
      () => {
        const loan = this.loans.find((l) => l.loanId === id);
        if (loan) {
          loan.isApproved = isApproved;
        }
      },
      (error) => {
        console.error('Error approving loan:', error);
      }
    );
  }

  // Repay loan
  repayLoan(id: number): void {
    this.loanService.repayLoan(id, this.repaymentAmount).subscribe(
      (response) => {
        const loan = this.loans.find((l) => l.loanId === id);
        if (loan) {
          loan.remainingBalance = response.remainingBalance;
        }
        this.repaymentAmount = 0; // Reset repayment amount
      },
      (error) => {
        console.error('Error repaying loan:', error);
      }
    );
  }

  // Calculate loan penalty
  calculatePenalty(id: number): void {
    this.loanService.calculatePenalty(id, this.overdueDays).subscribe(
      (response) => {
        this.penaltyAmount = response.penalty;
      },
      (error) => {
        console.error('Error calculating penalty:', error);
      }
    );
  }
  //  // Select a loan to view details
    selectLoan(loan: Loan): void {
      this.selectedLoan = loan;
    }
  // Load current user details (Example)
  loadCurrentUser(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.currentUser = user;
      });
    }
  }
}
