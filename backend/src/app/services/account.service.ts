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
  private updateURL = "http://localhost:8080/api/v1/updateaccounts"
  private deleteURL = "http://localhost:8080/api/v1/deleteaccounts"
  private transactionURL = "http://localhost:8080/api/v1/updatetransaction"


  constructor(private httpClient: HttpClient) { }

  getAccountsList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }
  
  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post(`${this.createUrl}`, account);
  }

  updateAfterTransaction(accountTransaction: AccountTransaction): Observable<object>{
    return this.httpClient.put(`${this.transactionURL}`, accountTransaction);
  }

  updateDefault(account: Account): Observable<Object>{
    return this.httpClient.put(`${this.updateURL}`, account)
  }

  deleteAccounts(): Observable<Object>{
    return this.httpClient.delete(`${this.deleteURL}`)
  }

  getDataWithPolling(intervalMs: number): Observable<any> {
    return interval(intervalMs).pipe(
      switchMap(() => this.getAccountsList())
    );}
}
