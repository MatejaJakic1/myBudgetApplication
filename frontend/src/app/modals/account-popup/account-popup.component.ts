import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
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

    constructor(private accountService: AccountService, private currencyService: CurrencyService, private refreshService: RefreshService){}

    @Output() modalClosed: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(): void {
      this.getCurrrencies();
    }

    currencies: Currency = {}
    currency_key : string;
    exchange : Exchange;
    
    account : Account;
    accounts : Account[] = [];

    input_id : number;
    input_name : string;
    input_currency : string = "eur";
    default_currency : string; 
    input_balance : number;
    default_balance : number;
  
  


    createAccount() {
      this.currencyService.getCurrencyCode().subscribe(currencyCode => {
        this.default_currency = currencyCode;
        this.currencyService.getExchangeJSON(this.default_currency).subscribe(data => {
          this.exchange = data;
          this.checkIfNameExists(this.input_name).subscribe(nameExists => {
            if (this.input_balance != null && !nameExists) {
              this.default_balance = this.input_balance / this.exchange[this.default_currency][this.input_currency];
              this.account = { id: this.input_id, name: this.input_name, currency: this.input_currency, default_currency: this.default_currency, balance: this.input_balance, default_balance: this.default_balance };
              this.saveAccount();
            } else {
              this.clearAllInputs();
              console.log("Account can't be created because the username already exists");
            }
          });
        });
      });
    }

    saveAccount() {
      this.accountService.createAccount(this.account).subscribe(data => {
        this.clearAllInputs();
        this.refreshService.triggerRefresh(); 
      });
    }

    checkIfNameExists(account_name: string): Observable<boolean> {
      return this.accountService.getAccountsList().pipe(
        map((accounts: Account[]) => {
          this.accounts = accounts;
          if (this.accounts.length > 0) {
            for (const account of this.accounts) {
              if (account_name === account.name) {
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

    private clearAllInputs(){
      this.input_id = null;
      this.input_name = '';
      this.input_currency = 'eur';
      this.input_balance = null;
      this.account = null;
      this.default_balance = null;
    }


}
