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
  accountTransaction : AccountTransaction;
  
  exchange: Exchange;
  exchangeTrans: Exchange;
  exchangeAcc: Exchange;

  inputId : number;
  inputDescription: string;
  inputType : string = "expense";
  inputAccount: string = "choose";
  defaultPlaceholder: string = "0";
  inputAccountCurrency: string;
  inputAccountBalance: number;
  inputBalance: number;

  currency : string;


  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => { 
      this.accounts = data; 
      const defaultCurrency = localStorage.getItem('currencyCode') || 'eur';
      this.defaultPlaceholder = "0 " + defaultCurrency.toUpperCase(); 
    })
  }

  createTransaction(){
    this.getAccounts();
    this.checkType();
    const account = this.accounts.find(acc => acc.name === this.inputAccount);
    this.currencyService.getCurrencyCode().subscribe(data => {this.currency = data;})
    this.currencyService.getExchangeJSON(this.currency).subscribe(data => {
      this.exchangeTrans = data; 
      this.inputAccountCurrency = account.currency;
      this.inputAccountBalance = this.inputBalance * this.exchangeTrans[this.currency][this.inputAccountCurrency];
      this.inputAccountBalance = Math.round(this.inputAccountBalance * 100) / 100;
      this.transaction = {id: this.inputId, description: this.inputDescription, accountName: this.inputAccount, defaultCurrency: this.currency, defaultAmount: this.inputBalance, amount: this.inputAccountBalance, currency: this.inputAccountCurrency};
      this.saveTransaction();
    })
  }

  saveTransaction() {
    this.transactionService.createTransaction(this.transaction).subscribe(data => { 
      this.updateAccount(this.transaction); 
      this.clearAllInputs();
    });
  }

  private checkType(){
    if(this.inputType == "expense"){
      this.inputBalance = -this.inputBalance;
    }
  }

  private updateAccount(transaction : Transaction){
    const account = this.accounts.find(acc => acc.name === this.inputAccount);
    this.accountTransaction = { account: account, transaction: transaction };
    this.currencyService.getExchangeJSON(this.accountTransaction.transaction.currency.toLowerCase()).subscribe(data => {
    this.exchange = data;

    this.accountTransaction.account.balance += this.accountTransaction.transaction.amount * this.exchange[this.accountTransaction.transaction.currency][this.accountTransaction.account.currency];

  this.currencyService.getExchangeJSON(this.accountTransaction.account.defaultCurrency.toLowerCase()).subscribe(data2 => {
    this.exchangeAcc = data2;
    this.accountTransaction.account.defaultBalance = this.accountTransaction.account.balance / this.exchangeAcc[this.accountTransaction.account.defaultCurrency][this.accountTransaction.account.currency];
    this.accountService.updateAfterTransaction(this.accountTransaction).subscribe(data => {
      this.refreshService.triggerRefresh(); 
    });
  });
});}

  clearAllInputs(){
    this.inputId = null;
    this.inputDescription = '';
    this.inputType = 'expense';
    this.inputId = null;
    this.inputBalance = null;
  }
}
