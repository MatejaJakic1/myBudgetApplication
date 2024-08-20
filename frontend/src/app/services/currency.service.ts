import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/Currency';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Exchange } from '../models/Exchange';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {


  private currencies_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  private exchangeSubject = new BehaviorSubject<Exchange | null>(null);
  private currencyCodeSubject = new BehaviorSubject<string>(localStorage.getItem('currencyCode') || 'eur'); 


  constructor(private httpClient: HttpClient) {
    const storedCurrencyCode = localStorage.getItem('currencyCode');
    if (storedCurrencyCode) {
      this.currencyCodeSubject.next(storedCurrencyCode);
  }   
}

  setExchange(exchange: Exchange): void {
    this.exchangeSubject.next(exchange);
  }

  getExchange(): Observable<Exchange | null> {
    return this.exchangeSubject.asObservable();
  }

  getExchangeJSON(currency_code : string): Observable<Exchange>{
    const exchangeUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency_code}.json`;
    return this.httpClient.get<Exchange>(exchangeUrl);
  }

  setCurrencyCode(currency_code: string): void {
    this.currencyCodeSubject.next(currency_code);
    localStorage.setItem('currencyCode', currency_code);
  }

  getCurrencyCode(): Observable<string> {
    return this.currencyCodeSubject.asObservable();
  }

  getCurrencies(): Observable<Currency>{
    return this.httpClient.get<Currency>(`${this.currencies_url}`);
  }

}
