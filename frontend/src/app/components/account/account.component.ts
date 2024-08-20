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
import { BalanceService } from '../../balance.service';
import { RefreshService } from '../../refresh.service';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountPopupComponent, FirstFooterComponent, TransactionPopupComponent, TransactionComponent, NgIf, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService, private currencyService: CurrencyService, private refreshService: RefreshService){}

  accounts : Account[] = [];
  currencies : Currency = {};
  exchange : Exchange;
  selectedCurrency : string;

  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.getAccounts();
    });
    this.currencyService.getExchange().subscribe(exchange => {
      this.currencyService.getCurrencyCode().subscribe(currencyCode => {this.selectedCurrency = currencyCode})
      this.currencyService.getExchangeJSON(this.selectedCurrency).subscribe(data =>{this.exchange = data; this.getAccounts();});  
    })
  }

  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => {
      this.accounts = data;})
  }

}
