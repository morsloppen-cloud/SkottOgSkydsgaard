import { Component, effect, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';
import { gsap } from 'gsap';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['../home/home.component.css'], // Reuse styling
    template: `
    <div *ngIf="state.isAboutOpen()"
        class="about-overlay fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm cursor-pointer"
        (click)="close()">
        <div class="about-card bg-[#f5f5f5] text-black w-[90vw] md:w-[600px] p-8 md:p-12 relative cursor-default"
        (click)="$event.stopPropagation()">
            
            <div class="font-mono text-xs md:text-sm uppercase leading-relaxed tracking-wide space-y-8">
                <div>
                    <p class="mb-2">Bare to barndomsvenner, der har slået sig sammen om at bygge og skabe.</p>
                    <p class="text-black/50">Håndværk · Tømrer</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/10">
                    <div>
                        <h4 class="text-black/50 mb-2">Kontakt</h4>
                        <a href="tel:21183808" class="block hover:text-black/60 transition-colors">21 18 38 08</a>
                        <a href="mailto:Skoettskydsgaard@gmail.com" class="block hover:text-black/60 transition-colors">Skoettskydsgaard@gmail.com</a>
                        <div class="mt-4">
                            <p>Vesterskovgårdsvej 10</p>
                            <p>Mørke, Denmark</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-black/50 mb-2">Firmaoplysninger</h4>
                        <p>Skøtt & Skydsgaard ApS</p>
                        <p>CVR-nr 44650088</p>
                    </div>
                </div>

                <div class="flex justify-end items-end pt-12 text-[10px] text-black/40">
                    <a href="https://www.instagram.com/skoett_og_skydsgaard/" target="_blank" class="text-sm font-bold text-black border-b border-black hover:text-black/60 hover:border-black/60 transition-all">INSTAGRAM</a>
                </div>
            </div>

        </div>
    </div>
  `
})
export class AboutComponent {
    constructor(public state: StateService, private ngZone: NgZone) {
        effect(() => {
            if (this.state.isAboutOpen()) {
                this.animateOpen();
            }
        });
    }

    animateOpen() {
        setTimeout(() => {
            gsap.fromTo('.about-overlay',
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
            );
            gsap.fromTo('.about-card',
                { scale: 0.9, rotation: -2 },
                { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
        }, 0);
    }

    close() {
        gsap.to('.about-overlay', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.ngZone.run(() => {
                    this.state.setAbout(false);
                });
            }
        });
    }
}
