import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/Account';
import { AccountService } from '../../account.service';
import { Currency } from '../../models/Currency';
import { KeyValuePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Exchange } from '../../models/Exchange';
import { CurrencyService } from '../../currency.service';

@Component({
  selector: 'app-account-popup',
  standalone: true,
  imports: [FormsModule, KeyValuePipe, CommonModule],
  templateUrl: './account-popup.component.html',
  styleUrl: './account-popup.component.css'
})
export class AccountPopupComponent implements OnInit{

    constructor(private accountService: AccountService, private currencyService: CurrencyService){}

    ngOnInit(): void {
      this.getExchange();
      this.getCurrrencies();
    }

    currencies: Currency = {}
    account : Account;
    inputId : number;
    inputAccount : string;
    inputCurrency : string = "eur";
    defaultCurrency : string; 
    inputBalance : number;
    defaultBalance : number;
    currencyKey : string;
    exchange : Exchange;


    createAccount() {
      this.currencyService.getCurrencyCode().subscribe(currencyCode => {
        this.defaultCurrency = currencyCode;
        this.currencyKey = Object.keys(this.exchange).find(key => key !== 'date');
        this.defaultBalance =  this.inputBalance /  this.exchange[this.currencyKey][this.inputCurrency.toLowerCase()];
        this.account = { id: this.inputId, name: this.inputAccount, currency: this.inputCurrency, default_currency: this.defaultCurrency, balance: this.inputBalance, default_balance: this.defaultBalance };
        this.saveAccount();
      });
    }

    saveAccount() {
      this.accountService.createAccount(this.account).subscribe(data => { console.log(data); });
    }


    private getExchange() {
      this.currencyService.getExchange().subscribe(exchange => {
        if (exchange) {
          this.exchange = exchange;
        } else {
          this.currencyService.getExchangeJSON('eur').subscribe(data => { this.exchange = data; });
        }
      });
    }

    private getCurrrencies(){
      this.currencyService.getCurrencies().subscribe(data => {this.currencies = data});
    }
}
