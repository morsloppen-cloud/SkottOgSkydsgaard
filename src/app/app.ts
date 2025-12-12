import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { AboutComponent } from './components/about.component';
import { ProjectDetailComponent } from './components/project-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AboutComponent, ProjectDetailComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'portfolio';
}
