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
  exchange_trans : Exchange;
  currencies : Currency;
  selected_currency : string = 'eur';
  accounts: Account[];
  transactions: Transaction[];
  formattedDate : string;

  ngOnInit(): void {
      this.currencyService.getCurrencies().subscribe(data => {
        this.currencies = data; 
        const storedCurrencyCode = localStorage.getItem('currencyCode') || 'eur';
        this.selected_currency = storedCurrencyCode;
        this.currencyService.getExchangeJSON(storedCurrencyCode).subscribe(data => {this.exchange = data;
          const date = new Date(this.exchange.date); 
          this.formatDate(date); 
        }) 
      });
  }

  private loadExchange(currency_code: string) : void {
      localStorage.setItem('currencyCode', currency_code);
      this.updateDefaultCurrencyAccount(currency_code);
      this.updateDefaultCurrencyTransaction(currency_code);
  }

  private formatDate(date: Date){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    this.formattedDate =`${day}.${month}.${year}.`
  }

  onCurrencySelected(selected_currency: string): void {
    this.currencyService.getExchangeJSON(selected_currency).subscribe(data => {this.exchange = data; 
      const date = new Date(this.exchange.date); 
      this.formatDate(date); 
      this.loadExchange(selected_currency);
  });
  }

  private updateDefaultCurrencyAccount(currency_code: string){
    this.accountService.getAccountsList().subscribe(data => {
      this.accounts = data;
      this.currencyService.setCurrencyCode(currency_code);
      for(const account of this.accounts){
        this.currencyService.getExchangeJSON(account.currency).subscribe(data => {
        this.exchange = data;
        account.default_balance = account.balance * this.exchange[account.currency][currency_code];
        account.default_currency = currency_code;
        this.accountService.updateDefaultBalance(account).subscribe();
        })
      }
    });
  }
  
  private updateDefaultCurrencyTransaction(currency_code: string){
    this.transactionService.getTransactionsList().subscribe(data => {
      this.transactions = data;
        for(const transaction of this.transactions){
          this.currencyService.getExchangeJSON(transaction.currency.toLowerCase()).subscribe(data => {
            this.exchange_trans = data;
            transaction.default_balance = transaction.balance * this.exchange_trans[transaction.currency][currency_code];
            transaction.default_currency = currency_code;
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
