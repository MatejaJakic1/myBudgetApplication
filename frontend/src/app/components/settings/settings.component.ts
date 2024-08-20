import { Component, OnInit } from '@angular/core';
import { SecondFooterComponent } from "../../footers/second-footer/second-footer.component";
import { CurrencyService } from '../../currency.service';
import { Exchange } from '../../models/Exchange';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Currency } from '../../models/Currency';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/Account';
import { AccountService } from '../../account.service';
import { TransactionService } from '../../transaction.service';
import { Transaction } from '../../models/Transaction';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SecondFooterComponent, NgIf, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  constructor(private currencyService: CurrencyService, private accountService: AccountService, private transactionService: TransactionService){}
  exchange : Exchange;
  exchangeTrans : Exchange;
  currencies : Currency;
  accounts: Account[];
  transactions: Transaction[];
  selectedCurrency : string = 'eur';

  ngOnInit(): void {
      this.currencyService.getCurrencies().subscribe(data => {
        this.currencies = data; 
        const storedCurrencyCode = localStorage.getItem('currencyCode') || 'eur';
        this.selectedCurrency = storedCurrencyCode;
        this.loadExchange(storedCurrencyCode);;});
  }

  private loadExchange(currencyCode: string) : void {
      this.updateDefaultCurrencyAccount(currencyCode);
      this.updateDefaultCurrencyTransaction(currencyCode);
      localStorage.setItem('currencyCode', currencyCode);
  }

  private formatDate(){
    const date = new Date(this.exchange.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    this.exchange.date = `${day}.${month}.${year}.`;
  }

  onCurrencySelected(selectedCurrency: string): void {
    this.loadExchange(selectedCurrency);
  }

  private updateDefaultCurrencyAccount(currencyCode: string){
    this.accountService.getAccountsList().subscribe(data => {
      this.accounts = data;
      this.currencyService.setCurrencyCode(currencyCode);
      for(const account of this.accounts){
        this.currencyService.getExchangeJSON(account.currency).subscribe(data => {
        this.exchange = data;
        this.formatDate();
        account.default_balance = account.balance * this.exchange[account.currency][currencyCode];
        account.default_currency = currencyCode;
        this.accountService.updateDefault(account).subscribe();
        })}
    });
  }
  
  private updateDefaultCurrencyTransaction(currencyCode: string){
    this.transactionService.getTransactionsList().subscribe(data => 
      {this.transactions = data;
        for(const transaction of this.transactions){
          this.currencyService.getExchangeJSON(transaction.currency.toLowerCase()).subscribe(data => {
            this.exchangeTrans = data;
            transaction.default_amount = transaction.amount * this.exchangeTrans[transaction.currency.toLowerCase()][currencyCode];
            transaction.default_currency = currencyCode;
            this.transactionService.updateDefaultTransaction(transaction).subscribe();
          })
        }
      })
  }

  deleteAllData(){
    this.accountService.deleteAccounts().subscribe();
    this.transactionService.deleteTransactions().subscribe();
  }

}
