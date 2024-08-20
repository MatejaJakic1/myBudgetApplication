import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { Account } from '../models/Account';
import { AccountTransaction } from '../models/AccountTransaction';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:8080/api/v1/accounts";
  private createUrl = "http://localhost:8080/api/v1/createaccount";
  private updateUrl = "http://localhost:8080/api/v1/updateaccounts"
  private deleteUrl = "http://localhost:8080/api/v1/deleteaccounts"
  private transactionUrl = "http://localhost:8080/api/v1/updatetransaction"


  constructor(private httpClient: HttpClient) { }

  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post(`${this.createUrl}`, account);
  }

  getAccountsList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }
  
  deleteAccounts(): Observable<Object>{
    return this.httpClient.delete(`${this.deleteUrl}`)
  }

  updateAfterTransaction(accountTransaction: AccountTransaction): Observable<object>{
    return this.httpClient.put(`${this.transactionUrl}`, accountTransaction);
  }

  updateDefaultBalance(account: Account): Observable<Object>{
    return this.httpClient.put(`${this.updateUrl}`, account)
  }

}
