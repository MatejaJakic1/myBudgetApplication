import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Account } from './models/Account';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private accountService: AccountService){}

  balance : number = 0;
  accounts: Account[] = []

  getBalance(): Observable<number>{
    this.balance = 0;
    return this.accountService.getAccountsList().pipe(
      map((accounts: Account[]) => {
        let balance = 0;
        for (const account of accounts) {
          balance += account.default_balance;
        }
<<<<<<< HEAD
        return (Math.round(balance * 100) / 100);
=======
        return balance;
>>>>>>> f8d1c0dcca499ea29d11d70a11a3000def5ded5d
      }));
}

}
