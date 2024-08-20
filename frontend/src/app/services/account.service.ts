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

  private base_url = "http://localhost:8080/api/v1/accounts";
  private create_url = "http://localhost:8080/api/v1/createaccount";
  private update_url = "http://localhost:8080/api/v1/updateaccounts"
  private delete_url = "http://localhost:8080/api/v1/deleteaccounts"
  private transaction_url = "http://localhost:8080/api/v1/updatetransaction"


  constructor(private httpClient: HttpClient) { }

  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post(`${this.create_url}`, account);
  }

  getAccountsList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.base_url}`);
  }
  
  deleteAccounts(): Observable<Object>{
    return this.httpClient.delete(`${this.delete_url}`)
  }

  updateAfterTransaction(accountTransaction: AccountTransaction): Observable<object>{
    return this.httpClient.put(`${this.transaction_url}`, accountTransaction);
  }

  updateDefaultBalance(account: Account): Observable<Object>{
    return this.httpClient.put(`${this.update_url}`, account)
  }

}
