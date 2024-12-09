
import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  newTransaction: Transaction = new Transaction();
  transactionType: string = '';
  accountId: number | null = null; // For filtering by account ID

  constructor(
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private routes: Router
  ) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  // Fetch all transactions
  getAllTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.filteredTransactions = transactions;
      },
      (error) => {
        console.error('Error fetching all transactions:', error);
      }
    );
  }

  // Fetch transactions by account ID
  getTransactionsByAccountId(): void {
    if (this.accountId === null) {
      this.filteredTransactions = this.transactions; // Show all transactions if no account ID
      return;
    }
    this.transactionService.getTransactionsByAccountId(this.accountId).subscribe(
      (transactions) => {
        this.filteredTransactions = transactions;
      },
      (error) => {
        console.error(`Error fetching transactions for account ID ${this.accountId}:`, error);
        this.filteredTransactions = []; // Clear filtered transactions on error
      }
    );
  }

  submitTransaction(): void {
    if (this.transactionType === 'Deposit') {
      this.transactionService.deposit(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.filteredTransactions = this.transactions;
          this.resetForm();
        },
        (error) => {
          console.error('Error during deposit:', error);
        }
      );
    } else if (this.transactionType === 'Withdraw') {
      this.transactionService.withdraw(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.filteredTransactions = this.transactions;
          this.resetForm();
        },
        (error) => {
          console.error('Error during withdrawal:', error);
        }
      );
    } else if (this.transactionType === 'Transfer') {
      this.transactionService.transfer(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.filteredTransactions = this.transactions;
          this.resetForm();
        },
        (error) => {
          console.error('Error during transfer:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newTransaction = new Transaction();
    this
  }
}
