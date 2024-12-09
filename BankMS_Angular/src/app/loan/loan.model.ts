import { User } from "../user/user.model";

export class Loan {
  loanId: number = 0;
  principalAmount: number = 0;
  interestRate: number = 0;
  termMonths: number | null = null;
  loanDate: Date = new Date();
  isApproved: boolean = false;
  penaltyRate: number = 0;
  remainingBalance: number | null = null;
  userId: number = 0;

  //// Optional: Add user details if needed
  user?: User;
}
