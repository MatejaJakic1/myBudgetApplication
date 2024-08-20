import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountPopupComponent } from "../../modals/account-popup/account-popup.component";
import { FirstFooterComponent } from "../../footers/first-footer/first-footer.component";
import { TransactionPopupComponent } from "../../modals/transaction-popup/transaction-popup.component";
import { TransactionComponent } from "../transaction/transaction.component";
import { AccountService } from '../../account.service';
import { Currency } from '../../models/Currency';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../currency.service';
import { Exchange } from '../../models/Exchange';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountPopupComponent, FirstFooterComponent, TransactionPopupComponent, TransactionComponent, NgIf, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService, private currencyService: CurrencyService){}

  accounts : Account[] = [];
  balanceSum : number  = 0;
  currencies : Currency = {};
  exchange : Exchange;
  selectedCurrency : string;

  ngOnInit(): void {
    this.currencyService.getExchange().subscribe(data => {this.exchange = data; this.getAccounts(); this.getCurrencies();  })
   
  }

  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => {this.accounts = data; for (const account of this.accounts) {
       account.euros = this.calculateEuros(account);} this.getBalance();})
  }

  private getCurrencies(){
    this.currencyService.getCurrencies().subscribe(data => {this.currencies = data;})
  }

  private getBalance(){
    for(const account of this.accounts){
      this.balanceSum += account.euros;
    }
  }

  calculateEuros(account : Account): number{
    return this.currencyService.calculateEuros(account, this.exchange);
  }
}
