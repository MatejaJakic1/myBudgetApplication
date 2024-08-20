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

@Component({
  selector: 'app-transaction-popup',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './transaction-popup.component.html',
  styleUrl: './transaction-popup.component.css'
})
export class TransactionPopupComponent {

  constructor(private accountService: AccountService, private transactionService : TransactionService, private currencyService : CurrencyService){}

    ngOnInit(): void {
      this.getAccounts();
    }


  accounts : Account[] = [];
  account : Account;
  exchange: Exchange;
  exchangeAcc: Exchange;
  accountTransaction : AccountTransaction;
  inputId : number;
  transaction : Transaction;
  inputDescription: string;
  inputType : string;
  inputAccount: string;
  inputTransaction: string;
  amount: number;
  currency : string;


  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => { this.accounts = data;})
  }

  createTransaction(){
    this.parseAmount();
    this.getAccounts();
    this.checkType();
    this.transaction = {id: this.inputId, description: this.inputDescription, accountName: this.inputAccount, amount: this.amount, currency: this.currency.toUpperCase()};
    this.saveTransaction();
  }
  saveTransaction() {
    this.transactionService.createTransaction(this.transaction).subscribe(data => { this.updateAccount(this.inputAccount, this.transaction) });
  }

  private parseAmount(){
    const regex = /^(\d+(?:\.\d+)?)\s+([a-zA-Z]+)$/;
    const matches = this.inputTransaction.match(regex);
    if(matches){
      this.amount = parseFloat(matches[1]);
      this.currency = matches[2];
    }
  }
  private checkType(){
    if(this.inputType == "expense"){
      this.amount = -this.amount;
    }
  }

  private updateAccount(account_name : string, transaction : Transaction){
    const account = this.accounts.find(acc => acc.name === account_name);
    this.accountTransaction = { account: account, transaction: transaction };
    this.currencyService.getExchangeJSON(this.accountTransaction.transaction.currency.toLowerCase()).subscribe(data => {
    this.exchange = data;

    this.accountTransaction.account.balance += this.accountTransaction.transaction.amount * this.exchange[this.accountTransaction.transaction.currency.toLowerCase()][this.accountTransaction.account.currency.toLowerCase()];
    this.accountTransaction.account.balance = Math.round(this.accountTransaction.account.balance * 100) / 100;

  this.currencyService.getExchangeJSON(this.accountTransaction.account.currency.toLowerCase()).subscribe(data2 => {
    this.exchangeAcc = data2;
    if (this.exchangeAcc) {
      this.accountTransaction.account.default_balance = this.accountTransaction.account.balance * this.exchangeAcc[this.accountTransaction.account.currency][this.accountTransaction.account.default_currency];
      this.accountTransaction.account.default_balance = Math.round(this.accountTransaction.account.default_balance * 100) / 100;
    } else {
      console.error(`Exchange rate not found for ${this.accountTransaction.account.currency} to ${this.accountTransaction.account.default_currency}`);
    }

    this.accountService.updateAfterTransaction(this.accountTransaction).subscribe(data => {
      console.log(data);
    });
  });
});}
}
