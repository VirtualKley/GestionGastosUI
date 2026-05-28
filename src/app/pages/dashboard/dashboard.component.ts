import { Component } from '@angular/core';
import { CardModule } from "primeng/card";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
