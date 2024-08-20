import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../account.service';
import { Account } from '../../models/Account';
import { NgFor } from '@angular/common';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../transaction.service';
import { AccountTransaction } from '../../models/AccountTransaction';
import { Exchange } from '../../models/Exchange';
import { CurrencyService } from '../../currency.service';
import { NgIf } from '@angular/common';
import { RefreshService } from '../../refresh.service';


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
  exchange: Exchange;
  exchangeTrans: Exchange;
  exchangeAcc: Exchange;
  accountTransaction : AccountTransaction;
  inputId : number;
  transaction : Transaction;
  inputDescription: string;
  inputType : string = "expense";
  inputAccount: string ="";
  defaultPlaceholder: string = "0";


  inputAccountCurrency: string;
  inputAccountAmount: number;

  inputAmount: number;
  currency : string;


  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => { this.accounts = data; this.defaultPlaceholder = "0 " + this.accounts[0].default_currency.toUpperCase()})
  }

  createTransaction(){
    this.getAccounts();
    this.checkType();
    const account = this.accounts.find(acc => acc.name === this.inputAccount);
    this.currencyService.getCurrencyCode().subscribe(data => {this.currency = data;})
    this.currencyService.getExchangeJSON(this.currency).subscribe(data => {
      this.exchangeTrans = data; 
      this.inputAccountCurrency = account.currency;
      this.inputAccountAmount = this.inputAmount * this.exchangeTrans[this.currency][this.inputAccountCurrency];
      this.inputAccountAmount = Math.round(this.inputAccountAmount * 100) / 100;
      this.transaction = {id: this.inputId, description: this.inputDescription, accountName: this.inputAccount, default_currency: this.currency, default_amount: this.inputAmount, amount: this.inputAccountAmount, currency: this.inputAccountCurrency};
      this.saveTransaction();
    })
  }

  saveTransaction() {
    this.transactionService.createTransaction(this.transaction).subscribe(data => { this.updateAccount(this.inputAccount, this.transaction); this.refreshService.triggerRefresh() });
  }

  private checkType(){
    if(this.inputType == "expense"){
      this.inputAmount = -this.inputAmount;
    }
  }

  private updateAccount(account_name : string, transaction : Transaction){
    const account = this.accounts.find(acc => acc.name === account_name);
    this.accountTransaction = { account: account, transaction: transaction };
    this.currencyService.getExchangeJSON(this.accountTransaction.transaction.currency.toLowerCase()).subscribe(data => {
    this.exchange = data;

    this.accountTransaction.account.balance += this.accountTransaction.transaction.amount * this.exchange[this.accountTransaction.transaction.currency.toLowerCase()][this.accountTransaction.account.currency.toLowerCase()];

  this.currencyService.getExchangeJSON(this.accountTransaction.account.default_currency.toLowerCase()).subscribe(data2 => {
    this.exchangeAcc = data2;
    console.log(this.exchangeAcc);
    this.accountTransaction.account.default_balance = this.accountTransaction.account.balance / this.exchangeAcc[this.accountTransaction.account.default_currency][this.accountTransaction.account.currency];
    this.accountService.updateAfterTransaction(this.accountTransaction).subscribe(data => {
      console.log(data);
    });
  });
});}
}
