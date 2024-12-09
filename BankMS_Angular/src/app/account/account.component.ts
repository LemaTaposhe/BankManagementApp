


import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  accountForm!: FormGroup;  // Declare accountForm of type FormGroup
 
  selectedAccount: Account | null = null;
  currentUser: User | null = null;
  users: User[] = []; // To store the list of users
  newAccount: Account = new Account(); // Declare a newAccount instance

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private routes: Router
  ) { }

  ngOnInit(): void {
    this.getAllAccounts();
    this.loadCurrentUser();
    this.loadUsers();

    // Initialize the account form with form controls and validations
    this.accountForm = this.formBuilder.group({
      userId: ['', Validators.required],
      accountNumber: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      balance: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Load users from the database for the dropdown
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Get all accounts
  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (accounts) => {
        this.accounts = accounts;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  // Apply for a new account
  applyForAccount(): void {
    if (this.accountForm?.valid) { // Use optional chaining to safely access accountForm
      this.newAccount.userId = this.accountForm.value.userId;
      this.newAccount.accountNumber = this.accountForm.value.accountNumber;
      this.newAccount.accountType = this.accountForm.value.accountType;
      this.newAccount.currency = this.accountForm.value.currency;
      this.newAccount.balance = this.accountForm.value.balance;

      this.accountService.applyForAccount(this.newAccount).subscribe(
        (response) => {
          const account = response;
          this.accounts.push(account);
          this.accountForm?.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error applying for account:', error);
        }
      );
    }
  }

  // Update account information
  updateAccount(): void {
    if (this.selectedAccount && this.accountForm.valid) {
      this.accountService.updateAccount(this.selectedAccount.accountId, this.accountForm.value).subscribe(
        () => {
          this.getAllAccounts();
          this.selectedAccount = null;
          this.accountForm.reset(); // Reset form
        },
        (error) => {
          console.error('Error updating account:', error);
        }
      );
    }
  }

  // Get account details to edit
  getAccountDetails(id: number): void {
    this.accountService.getAccountById(id).subscribe((account) => {
      this.selectedAccount = account;
      this.accountForm.patchValue(account); // Populate form with account data
    });
  }

  // Close account
  closeAccount(id: number): void {
    this.accountService.closeAccount(id).subscribe(() => {
      this.getAllAccounts();
    });
  }

  // Load current user details
  loadCurrentUser(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.currentUser = user;
      });
    }
  }

  // Select account for editing
  selectAccount(account: Account): void {
    this.selectedAccount = account;
    this.accountForm.patchValue(account); // Populate form with account data
  }
}


