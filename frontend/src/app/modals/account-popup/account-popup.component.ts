import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/account.service';
import { Currency } from '../../models/Currency';
import { KeyValuePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Exchange } from '../../models/Exchange';
import { CurrencyService } from '../../services/currency.service';
import { RefreshService } from '../../services/refresh.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-account-popup',
  standalone: true,
  imports: [FormsModule, KeyValuePipe, CommonModule],
  templateUrl: './account-popup.component.html',
  styleUrl: './account-popup.component.css'
})
export class AccountPopupComponent implements OnInit{

    constructor(
      private accountService: AccountService,
      private currencyService: CurrencyService, 
      private refreshService: RefreshService
    ){}

    ngOnInit(): void {
      this.getCurrrencies();
    }

    currencies: Currency = {}
    currencyKey : string;
    exchange : Exchange;
    
    account : Account;
    accounts : Account[] = [];

    inputId : number;
    inputName : string;
    inputCurrency : string = "eur";
    defaultCurrency : string; 
    inputBalance : number;
    defaultBalance : number;
  
  


    createAccount() {
      this.currencyService.getCurrencyCode().subscribe(currencyCode => {
        this.defaultCurrency = currencyCode;
        this.currencyService.getExchangeJSON(this.defaultCurrency).subscribe(data => {
          this.exchange = data;
          this.checkIfNameExists(this.inputName).subscribe(nameExists => {
            if (this.inputBalance != null && !nameExists) {
              this.defaultBalance = this.inputBalance / this.exchange[this.defaultCurrency][this.inputCurrency];
              this.account = { 
                id: this.inputId, 
                name: this.inputName, 
                currency: this.inputCurrency, 
                defaultCurrency: this.defaultCurrency, 
                balance: this.inputBalance, 
                defaultBalance: this.defaultBalance 
              };
              this.saveAccount();
            } else {
              this.clearAllInputs();
            }
          });
        });
      });
    }

    saveAccount() {
      this.accountService.createAccount(this.account).subscribe(() => {
        this.clearAllInputs();
        this.refreshService.triggerRefresh(); 
      });
    }

    checkIfNameExists(accountName: string): Observable<boolean> {
      return this.accountService.getAccountsList().pipe(
        map((accounts: Account[]) => {
          this.accounts = accounts;
          if (this.accounts.length > 0) {
            for (const account of this.accounts) {
              if (accountName === account.name) {
                return true;
              }
            }
          }
          return false;
        })
      );
    }


    private getCurrrencies(){
      this.currencyService.getCurrencies().subscribe(data => {this.currencies = data});
    }

    clearAllInputs(){
      this.inputId = null;
      this.inputName = '';
      this.inputCurrency = 'eur';
      this.inputBalance = null;
      this.account = null;
      this.defaultBalance = null;
    }


}
