import { Component } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { FirstFooterComponent } from "../../footers/first-footer/first-footer.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FirstFooterComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transactions : Transaction[] = 
  [{
    name: "Dinner",
    account: "Account 1",
    amount: "145",
    currency: "EUR"
  },
  {
    name: "Groceries",
    account: "Account 2",
    amount: "30",
    currency: "EUR"
  }]
}
