import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private base_url = "http://localhost:8080/api/v1/transactions";
  private update_url = "http://localhost:8080/api/v1/updatetransactions"
  private delete_url = "http://localhost:8080/api/v1/deletetransactions"


  constructor(private httpClient: HttpClient) { }

  getTransactionsList(): Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(`${this.base_url}`);
  }
  
  createTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.post(`${this.base_url}`, transaction);
  }

  updateDefaultTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.put(`${this.update_url}`, transaction)
  }

  deleteTransactions(): Observable<Object>{
    return this.httpClient.delete(`${this.delete_url}`)
  }
}
