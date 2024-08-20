import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { FirstFooterComponent } from "../../footers/first-footer/first-footer.component";
import { TransactionService } from '../../transaction.service';
import { Account } from '../../models/Account';
import { AccountService } from '../../account.service';
import { NgFor } from '@angular/common';
import { RefreshService } from '../../refresh.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FirstFooterComponent, NgFor],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {

  constructor(private transactionService: TransactionService, private accountService: AccountService, private refreshService : RefreshService){}
  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.getTransactions();
    });
    this.getTransactions();
    this.getAccounts();
  }

  transactions : Transaction[] = [];
  accounts : Account[] = [];
  allTransactions : Transaction[] = [];


  getTransactions(){
    this.transactionService.getTransactionsList().subscribe(data => { this.transactions = data; this.allTransactions = this.transactions;})
  }
  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => {this.accounts = data;})
  }

  onAccountSelected(event: Event): void {
    this.transactions = [];
    const selectedAccountName = (event.target as HTMLSelectElement).value;
    for(const transaction of this.allTransactions){
      if(transaction.accountName == selectedAccountName){
        this.transactions.push(transaction);
      }
    }
  }
}
