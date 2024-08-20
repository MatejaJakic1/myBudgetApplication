import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './models/Account';
import { AccountTransaction } from './models/AccountTransaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:8080/api/v1/accounts";
  private updateURL = "http://localhost:8080/api/v1/updateaccounts"
  private deleteURL = "http://localhost:8080/api/v1/deleteaccounts"


  constructor(private httpClient: HttpClient) { }

  getAccountsList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }
  
  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, account);
  }

  updateAfterTransaction(accountTransaction: AccountTransaction): Observable<object>{
    return this.httpClient.put(`${this.baseUrl}`, accountTransaction);
  }

  updateDefault(account: Account): Observable<Object>{
    return this.httpClient.put(`${this.updateURL}`, account)
  }

  deleteAccounts(): Observable<Object>{
    return this.httpClient.delete(`${this.deleteURL}`)
  }
}
