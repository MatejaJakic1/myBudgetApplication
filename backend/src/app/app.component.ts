import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { AccountComponent } from "./components/account/account.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'my-budget';
  @ViewChild('defaultLink') defaultLink: ElementRef;
  
  ngAfterViewInit(): void {
    if (this.defaultLink) {
      this.defaultLink.nativeElement.focus();
    }
  }



}
