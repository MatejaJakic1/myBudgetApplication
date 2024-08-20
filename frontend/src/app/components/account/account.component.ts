import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountPopupComponent } from "../../modals/account-popup/account-popup.component";
import { FirstFooterComponent } from "../../footers/first-footer/first-footer.component";
import { TransactionPopupComponent } from "../../modals/transaction-popup/transaction-popup.component";
import { TransactionComponent } from "../transaction/transaction.component";
import { AccountService } from '../../services/account.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { Exchange } from '../../models/Exchange';
import { RefreshService } from '../../services/refresh.service';
import { NgFor } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccountPopupComponent, FirstFooterComponent, TransactionPopupComponent, TransactionComponent, NgIf, CommonModule, NgFor,],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService, private currencyService: CurrencyService, private refreshService: RefreshService, private cdr: ChangeDetectorRef){}
  

  accounts : Account[] = [];
  exchange : Exchange;
  selected_currency : string;

  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => { this.getAccounts(); });
    this.currencyService.getCurrencyCode().subscribe(currencyCode => {
      this.selected_currency = currencyCode; 
      this.getAccounts()
    });
  }


  private getAccounts(){
    this.accountService.getAccountsList().subscribe(data => {
      this.accounts = data;
    })
  }
}
