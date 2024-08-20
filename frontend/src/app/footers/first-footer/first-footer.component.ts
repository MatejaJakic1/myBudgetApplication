import { Component, Input } from '@angular/core';
import { TransactionPopupComponent } from "../../modals/transaction-popup/transaction-popup.component";

@Component({
  selector: 'app-first-footer',
  standalone: true,
  imports: [TransactionPopupComponent],
  templateUrl: './first-footer.component.html',
  styleUrl: './first-footer.component.css'
})
export class FirstFooterComponent {

  @Input()
  balance = 0

}
