import { Component, OnInit } from '@angular/core';
import { SecondFooterComponent } from "../../footers/second-footer/second-footer.component";
import { CurrencyService } from '../../services/currency.service';
import { Exchange } from '../../models/Exchange';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Currency } from '../../models/Currency';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
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
  selectedCurrency : string = 'eur';
  accounts: Account[];
  transactions: Transaction[];
  formattedDate : string;

  ngOnInit(): void {
      this.currencyService.getCurrencies().subscribe(data => {
        this.currencies = data; 
        const storedCurrencyCode = localStorage.getItem('currencyCode') || 'eur';
        this.selectedCurrency = storedCurrencyCode;
        this.currencyService.getExchangeJSON(storedCurrencyCode).subscribe(data => {this.exchange = data;
          const date = new Date(this.exchange.date); 
          this.formatDate(date); 
        }) 
      });
  }

  private loadExchange(currencyCode: string) : void {
      localStorage.setItem('currencyCode', currencyCode);
      this.updateDefaultCurrencyAccount(currencyCode);
      this.updateDefaultCurrencyTransaction(currencyCode);
  }

  private formatDate(date: Date){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    this.formattedDate =`${day}.${month}.${year}.`
  }

  onCurrencySelected(selectedCurrency: string): void {
    this.currencyService.getExchangeJSON(selectedCurrency).subscribe(data => {this.exchange = data; 
      const date = new Date(this.exchange.date); 
      this.formatDate(date); 
      this.loadExchange(selectedCurrency);
  });
  }

  private updateDefaultCurrencyAccount(currencyCode: string){
    this.accountService.getAccountsList().subscribe(data => {
      this.accounts = data;
      this.currencyService.setCurrencyCode(currencyCode);
      for(const account of this.accounts){
        this.currencyService.getExchangeJSON(account.currency).subscribe(data => {
        this.exchange = data;
        account.defaultBalance = account.balance * this.exchange[account.currency][currencyCode];
        account.defaultCurrency = currencyCode;
        this.accountService.updateDefaultBalance(account).subscribe();
        })
      }
    });
  }
  
  private updateDefaultCurrencyTransaction(currencyCode: string){
    this.transactionService.getTransactionsList().subscribe(data => {
      this.transactions = data;
        for(const transaction of this.transactions){
          this.currencyService.getExchangeJSON(transaction.currency).subscribe(data => {
            this.exchangeTrans = data;
            transaction.defaultAmount = transaction.amount * this.exchangeTrans[transaction.currency][currencyCode];
            transaction.defaultCurrency = currencyCode;
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
