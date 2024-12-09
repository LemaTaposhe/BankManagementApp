
import { User } from '../user/user.model';

export class Account {
  accountId: number = 0;
  accountNumber: string = '';
  balance: number = 0;
  accountType: string | null = null;
  currency: string | null = null;
  userId: number = 0;

  // Add user property
  user?: User;
}
