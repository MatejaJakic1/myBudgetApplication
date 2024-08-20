import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/Account';
import { NgFor } from '@angular/common';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../services/transaction.service';
import { AccountTransaction } from '../../models/AccountTransaction';
import { Exchange } from '../../models/Exchange';
import { CurrencyService } from '../../services/currency.service';
import { NgIf } from '@angular/common';
import { RefreshService } from '../../services/refresh.service';


@Component({
  selector: 'app-transaction-popup',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './transaction-popup.component.html',
  styleUrl: './transaction-popup.component.css'
})
export class TransactionPopupComponent {

  constructor(private accountService: AccountService, private transactionService : TransactionService, private currencyService : CurrencyService, private refreshService : RefreshService){}

    ngOnInit(): void {
      this.getAccounts();
    }


  accounts : Account[] = [];
  account : Account;
  transaction : Transaction;
  account_transaction : AccountTransaction;
  
  exchange: Exchange;
  exchange_trans: Exchange;
  exchange_acc: Exchange;

  input_id : number;
  input_description: string;
  input_type : string = "expense";
  input_account: string = "choose";
  default_placeholder: string = "0";
  input_account_currency: string;
  input_account_balance: number;
  input_balance: number;

  currency : string;


  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => { 
      this.accounts = data; 
      const defaultCurrency = localStorage.getItem('currencyCode') || 'eur';
      this.default_placeholder = "0 " + defaultCurrency.toUpperCase(); 
    })
  }

  createTransaction(){
    this.getAccounts();
    this.checkType();
    const account = this.accounts.find(acc => acc.name === this.input_account);
    this.currencyService.getCurrencyCode().subscribe(data => {this.currency = data;})
    this.currencyService.getExchangeJSON(this.currency).subscribe(data => {
      this.exchange_trans = data; 
      this.input_account_currency = account.currency;
      this.input_account_balance = this.input_balance * this.exchange_trans[this.currency][this.input_account_currency];
      this.input_account_balance = Math.round(this.input_account_balance * 100) / 100;
      this.transaction = {id: this.input_id, description: this.input_description, account_name: this.input_account, default_currency: this.currency, default_balance: this.input_balance, balance: this.input_account_balance, currency: this.input_account_currency};
      this.saveTransaction();
    })
  }

  saveTransaction() {
    this.transactionService.createTransaction(this.transaction).subscribe(data => { 
      this.updateAccount(this.transaction); 
      this.clearAllInputs();
      this.refreshService.triggerRefresh(); 
    });
  }

  private checkType(){
    if(this.input_type == "expense"){
      this.input_balance = -this.input_balance;
    }
  }

  private updateAccount(transaction : Transaction){
    const account = this.accounts.find(acc => acc.name === this.input_account);
    this.account_transaction = { account: account, transaction: transaction };
    this.currencyService.getExchangeJSON(this.account_transaction.transaction.currency.toLowerCase()).subscribe(data => {
    this.exchange = data;

    this.account_transaction.account.balance += this.account_transaction.transaction.balance * this.exchange[this.account_transaction.transaction.currency][this.account_transaction.account.currency];

  this.currencyService.getExchangeJSON(this.account_transaction.account.default_currency.toLowerCase()).subscribe(data2 => {
    this.exchange_acc = data2;
    this.account_transaction.account.default_balance = this.account_transaction.account.balance / this.exchange_acc[this.account_transaction.account.default_currency][this.account_transaction.account.currency];
    this.accountService.updateAfterTransaction(this.account_transaction).subscribe(data => {
      console.log(data);
    });
  });
});}

  clearAllInputs(){
    this.input_id = null;
    this.input_description = '';
    this.input_type = 'expense';
    this.input_id = null;
    this.input_balance = null;
  }
}
