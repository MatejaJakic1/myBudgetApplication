import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from './models/Currency';
import { Observable } from 'rxjs';
import { Exchange } from './models/Exchange';
import { Account } from './models/Account';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {


  private currenciesUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  private exchangeUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

  constructor(private httpClient: HttpClient) {
   }

  getCurrencies(): Observable<Currency>{
    return this.httpClient.get<Currency>(`${this.currenciesUrl}`);
  }

  getExchange(): Observable<Exchange>{
    return this.httpClient.get<Exchange>(`${this.exchangeUrl}`);
  }

  calculateEuros(account : Account, exchange : Exchange): number{
    const euros =  account.balance /  exchange.eur[account.currency.toLowerCase()];
    return Math.round(euros * 100) / 100;
  }
}
