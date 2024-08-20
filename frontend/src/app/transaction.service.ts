import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = "http://localhost:8080/api/v1/transactions";


  constructor(private httpClient: HttpClient) { }

  getTransactionsList(): Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}`);
  }
  
  createTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, transaction);
  }
}
