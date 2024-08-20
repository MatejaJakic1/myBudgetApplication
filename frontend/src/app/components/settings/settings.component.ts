import { Component, OnInit } from '@angular/core';
import { SecondFooterComponent } from "../../footers/second-footer/second-footer.component";
import { CurrencyService } from '../../currency.service';
import { Exchange } from '../../models/Exchange';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Currency } from '../../models/Currency';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SecondFooterComponent, NgIf, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  constructor(private currencyService: CurrencyService){}
  exchange : Exchange;
  currencies : Currency;
  accounts: Account[];
  selectedCurrency : string = 'eur';

  ngOnInit(): void {
      this.currencyService.getCurrencies().subscribe(data => {
        this.currencies = data; 
        const storedCurrencyCode = localStorage.getItem('currencyCode') || 'eur';
        this.selectedCurrency = storedCurrencyCode;
        this.loadExchange(storedCurrencyCode);;});
  }

  private loadExchange(currencyCode: string) : void {
     this.currencyService.getExchangeJSON(currencyCode).subscribe(data => {
      this.exchange = data;
      this.formatDate();
      this.currencyService.setExchange(this.exchange);
      this.currencyService.setCurrencyCode(currencyCode);
      localStorage.setItem('currencyCode', currencyCode);
    });
  }

  private formatDate(){
    const date = new Date(this.exchange.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    this.exchange.date = `${day}.${month}.${year}.`;
  }

  onCurrencySelected(selectedCurrency: string): void {
    this.loadExchange(selectedCurrency);
  }

}
