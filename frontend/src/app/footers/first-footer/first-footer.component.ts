import { Component, OnInit } from '@angular/core';
import { TransactionPopupComponent } from "../../modals/transaction-popup/transaction-popup.component";
import { NgIf } from '@angular/common';
import { BalanceService } from '../../services/balance.service';
import { CurrencyService } from '../../services/currency.service';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-first-footer',
  standalone: true,
  imports: [TransactionPopupComponent, NgIf],
  templateUrl: './first-footer.component.html',
  styleUrl: './first-footer.component.css'
})
export class FirstFooterComponent implements OnInit{

  constructor(private balanceService : BalanceService, private currencyService: CurrencyService, private refreshService: RefreshService){}

  balance : number;
  defaultCurrency: string;

  ngOnInit(): void {
    this.getCurrencyAndBalance();
    this.refreshService.refresh$.subscribe(() => {
      this.getCurrencyAndBalance();
    });
  }
 
  private getCurrencyAndBalance() {
    this.currencyService.getCurrencyCode().subscribe(data => {
      this.defaultCurrency = data;
      this.getBalanceSum();
    });
  }
  
  private getBalanceSum() {
    this.balanceService.getBalance().subscribe((balance: number) => {
      this.balance = balance;
    });
  }


}
