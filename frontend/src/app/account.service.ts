import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './models/Account';
import { Currency } from './models/Currency';
import { Exchange } from './models/Exchange';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:8080/api/v1/accounts";


  constructor(private httpClient: HttpClient) { }

  getAccountsList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }
  
  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, account);
  }

}
