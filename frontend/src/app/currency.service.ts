import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from './models/Currency';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Exchange } from './models/Exchange';
import { Account } from './models/Account';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {


  private currenciesUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  private exchangeSubject = new BehaviorSubject<Exchange | null>(null);
  private currencyCodeSubject = new BehaviorSubject<string>(localStorage.getItem('currencyCode') || 'eur'); 
  private selectedCurrencyCode = "";

  constructor(private httpClient: HttpClient) {
    const storedCurrencyCode = localStorage.getItem('currencyCode');
    if (storedCurrencyCode) {
      this.currencyCodeSubject.next(storedCurrencyCode);
  }   
}

  getCurrencies(): Observable<Currency>{
    return this.httpClient.get<Currency>(`${this.currenciesUrl}`);
  }

  
  setExchange(exchange: Exchange): void {
    this.exchangeSubject.next(exchange);
  }

  getExchange(): Observable<Exchange | null> {
    return this.exchangeSubject.asObservable();
  }

  getExchangeJSON(currencyCode : string): Observable<Exchange>{
    const exchangeUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`;
    return this.httpClient.get<Exchange>(exchangeUrl);
  }

  setCurrencyCode(currencyCode: string): void {
    this.currencyCodeSubject.next(currencyCode);
    localStorage.setItem('currencyCode', currencyCode);
  }

  getCurrencyCode(): Observable<string> {
    return this.currencyCodeSubject.asObservable();
  }

  calculateDefault(account : Account, exchange : Exchange): number{
    this.getCurrencyCode().subscribe(currencyCode => {this.selectedCurrencyCode = currencyCode});
    this.getExchangeJSON(this.selectedCurrencyCode).subscribe(exchangeresult => {exchange = exchangeresult} );
    account.default_balance =  account.balance /  exchange[this.selectedCurrencyCode][account.currency.toLowerCase()];
    account.default_balance = Math.round(account.default_balance * 100) / 100;
    return account.default_balance;
  }
}
