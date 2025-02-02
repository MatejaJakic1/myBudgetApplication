import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { FirstFooterComponent } from "../../footers/first-footer/first-footer.component";
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/account.service';
import { NgFor } from '@angular/common';
import { RefreshService } from '../../services/refresh.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FirstFooterComponent, NgFor, NgIf, CommonModule],
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
  transactionsTemp : Transaction[] = [];


  getTransactions(){
    this.transactionService.getTransactionsList().subscribe(data => { 
      this.transactions = data; 
      this.transactionsTemp = this.transactions;
    })
  }
  
  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => {this.accounts = data;})
  }

  onAccountSelected(event: Event): void {
    this.transactions = [];
    const selectedAccountName = (event.target as HTMLSelectElement).value;
    for(const transaction of this.transactionsTemp){
      if(transaction.accountName == selectedAccountName){
        this.transactions.push(transaction);
      }
    }
  }
}
