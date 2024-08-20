import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  private baseUrl = "http://localhost:8080/api/v1/transactions";
  private updateUrl = "http://localhost:8080/api/v1/updatetransactions"
  private deleteUrl = "http://localhost:8080/api/v1/deletetransactions"


  constructor(private httpClient: HttpClient) { }

  getTransactionsList(): Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}`);
  }
  
  createTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, transaction);
  }

  updateDefaultTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.put(`${this.updateUrl}`, transaction)
  }

  deleteTransactions(): Observable<Object>{
    return this.httpClient.delete(`${this.deleteUrl}`)
  }
}
