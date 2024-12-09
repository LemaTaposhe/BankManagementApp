import { Account } from "../account/account.model";

export class Transaction {
  transactionId: number = 0;
  transactionDate: Date = new Date(); // Default to current date
  amount: number = 0; // Transaction amount
  transactionType: string | null = null; // Deposit, Withdrawal, Transfer
  description: string | null = null; // Description of the transaction
  fee: number | null = null; // Transaction fee, if applicable
  accountId: number = 0; // Associated account ID

  // Add Account property
  account?: Account;

  // External bank details for transfers, if applicable
  externalBankDetails: string | null = null;
}
