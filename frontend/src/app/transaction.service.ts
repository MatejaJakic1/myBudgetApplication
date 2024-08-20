import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = "http://localhost:8080/api/v1/transactions";
<<<<<<< HEAD
  private updateURL = "http://localhost:8080/api/v1/updatetransactions"
  private deleteURL = "http://localhost:8080/api/v1/deletetransactions"
=======
>>>>>>> f8d1c0dcca499ea29d11d70a11a3000def5ded5d


  constructor(private httpClient: HttpClient) { }

  getTransactionsList(): Observable<Transaction[]>{
    return this.httpClient.get<Transaction[]>(`${this.baseUrl}`);
  }
  
  createTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, transaction);
  }
<<<<<<< HEAD

  updateDefaultTransaction(transaction: Transaction): Observable<Object>{
    return this.httpClient.put(`${this.updateURL}`, transaction)
  }

  deleteTransactions(): Observable<Object>{
    return this.httpClient.delete(`${this.deleteURL}`)
  }
=======
>>>>>>> f8d1c0dcca499ea29d11d70a11a3000def5ded5d
}
