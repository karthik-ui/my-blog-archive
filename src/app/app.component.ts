import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.html',
})
export class AppComponent {}