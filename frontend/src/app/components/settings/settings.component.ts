import { Component } from '@angular/core';
import { SecondFooterComponent } from "../../footers/second-footer/second-footer.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SecondFooterComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
