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
    }

    @Input()
    currencies: Currency = {}

    account : Account;
    inputId : number;
    inputAccount : string;
    inputCurrency : string = "eur";
    inputBalance : number;
    inputEuros : number;
    exchange : Exchange;


    createAccount() {
      this.account = {id: this.inputId,name: this.inputAccount,currency: this.inputCurrency, balance: this.inputBalance, euros: this.inputEuros};
      this.saveAccount();
    }

    saveAccount() {
      this.accountService.createAccount(this.account).subscribe(data => { console.log(data); });
    }


    private getExchange(){
      this.currencyService.getExchange().subscribe(data => {this.exchange = data; })
      
    }
}
