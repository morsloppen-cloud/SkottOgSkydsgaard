import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-50 pointer-events-none"
         [ngClass]="isIndex ? 'bg-[#f5f5f5] text-black' : 'text-mukko-white'">
      
      <!-- Left: About -->
      <div class="flex-1 flex justify-start font-mono text-sm tracking-widest z-50 pointer-events-auto">
          <button (click)="state.toggleAbout()" class="hover:opacity-50 transition-opacity uppercase">About</button>
      </div>

      <!-- Center: Logo (Visible on all screens, centered) -->
      <div (click)="reset()" class=" z-51 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl tracking-tighter uppercase font-sans cursor-pointer hover:opacity-50 whitespace-nowrap z-40 pointer-events-auto">
          <!-- Short logo on mobile (SVG), full text on desktop -->
          <img src="/Skott_skydsgaard_rund.svg" alt="Skøtt & Skydsgaard" class="h-12 w-auto md:hidden">
          <span class="hidden md:block">SKØTT & SKYDSGAARD</span>
      </div>

      <!-- Right: Index -->
      <div class="flex-1 flex justify-end font-mono text-sm tracking-widest z-50 pointer-events-auto">
          <a routerLink="/index" routerLinkActive="opacity-50" class="hover:opacity-50 transition-opacity uppercase">Index</a>
      </div>
    </nav>
  `
})
export class NavbarComponent {
    isIndex = false;

    constructor(public state: StateService, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isIndex = this.router.url.includes('index');
            }
        });
    }

    reset() {
        this.state.reset();
        this.router.navigate(['/']);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
