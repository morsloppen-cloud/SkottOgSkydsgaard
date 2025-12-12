import { Component, ElementRef, EffectRef, effect, computed, ViewChildren, QueryList, NgZone, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';
import { gsap } from 'gsap';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="project()" class="fixed inset-0 z-[60] flex justify-end">
        <!-- Backdrop -->
        <div class="project-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" (click)="close()"></div>

        <!-- Panel -->
        <div class="project-detail-panel w-full md:w-[50vw] h-full bg-[#111] text-mukko-white relative overflow-y-auto transform translate-x-full">
            <button (click)="close()" class="absolute top-6 right-6 text-white mix-blend-difference z-50 text-xl font-mono hover:rotate-90 transition-transform">
                ✕
            </button>

            <div class="p-8 md:p-16 pt-24 min-h-full flex flex-col">
                <span class="font-mono text-xs text-mukko-gray uppercase mb-4 tracking-widest">{{ project()?.number }} — {{ project()?.category }}</span>
                <h2 class="text-4xl md:text-6xl font-bold font-sans mb-8 leading-[0.9] tracking-tight">{{ project()?.title }}</h2>
                
                <!-- Gallery Section -->
                <div class="mb-8">
                     <!-- Main Image -->
                     <div class="relative w-full aspect-video bg-zinc-800 overflow-hidden group select-none mb-4">
                         <img [src]="currentImage()" class="w-full h-full object-cover transition-opacity duration-300">
                         
                         <!-- Navigation Controls (Always Visible) -->
                         <div *ngIf="hasMultipleImages()" class="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                            <button (click)="prevImage($event)" class="pointer-events-auto w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                                ←
                            </button>
                            <button (click)="nextImage($event)" class="pointer-events-auto w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                                →
                            </button>
                         </div>
                     </div>

                     <!-- Thumbnails -->
                     <div *ngIf="hasMultipleImages()" class="flex flex-wrap gap-2">
                        <div *ngFor="let img of allImages(); let i = index" 
                             (click)="setIndex(i, $event)"
                             class="h-16 aspect-video cursor-pointer overflow-hidden opacity-50 hover:opacity-100 transition-all border-2"
                             [class.border-white]="currentImageIndex() === i"
                             [class.border-transparent]="currentImageIndex() !== i"
                             [class.opacity-100]="currentImageIndex() === i">
                             <img [src]="img" class="w-full h-full object-cover">
                        </div>
                     </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-white/10 pt-8">
                     <div class="col-span-2">
                         <h3 class="font-mono text-xs text-mukko-gray uppercase mb-4">Description</h3>
                         <p class="text-lg font-light leading-relaxed text-white/80">{{ project()?.description }}</p>
                     </div>
                     <div>
                        <h3 class="font-mono text-xs text-mukko-gray uppercase mb-4">Client</h3>
                        <p class="text-sm font-mono text-white/60">{{ project()?.client || 'Unknown Client' }}</p>
                        
                        <h3 class="font-mono text-xs text-mukko-gray uppercase mb-4 mt-8">Year</h3>
                        <p class="text-sm font-mono text-white/60">{{ project()?.year || '2025' }}</p>

                         <h3 class="font-mono text-xs text-mukko-gray uppercase mb-4 mt-8">Location</h3>
                        <p class="text-sm font-mono text-white/60">{{ project()?.location || 'Unknown' }}</p>
                     </div>
                </div>

            </div>
        </div>
    </div>
  `
})
export class ProjectDetailComponent {
    project = computed(() => this.state.selectedProject());

    currentImageIndex = signal(0);

    allImages = computed(() => {
        const p = this.project();
        if (!p) return [];
        return [p.image, ...(p.extraImages || [])];
    });

    currentImage = computed(() => {
        const images = this.allImages();
        return images[this.currentImageIndex()] || '';
    });

    hasMultipleImages = computed(() => this.allImages().length > 1);

    constructor(public state: StateService, private ngZone: NgZone) {
        effect(() => {
            const p = this.project();
            if (p) {
                this.currentImageIndex.set(0); // Reset on open
                this.animateOpen();
            }
        }, { allowSignalWrites: true });
    }

    nextImage(e: Event) {
        e.stopPropagation();
        const total = this.allImages().length;
        this.currentImageIndex.update(i => (i + 1) % total);
    }

    prevImage(e: Event) {
        e.stopPropagation();
        const total = this.allImages().length;
        this.currentImageIndex.update(i => (i - 1 + total) % total);
    }

    setIndex(i: number, e: Event) {
        e.stopPropagation();
        this.currentImageIndex.set(i);
    }

    animateOpen() {
        setTimeout(() => {
            gsap.fromTo('.project-detail-panel',
                { x: '100%' },
                { x: '0%', duration: 0.8, ease: 'power3.inOut' }
            );
            gsap.fromTo('.project-backdrop',
                { opacity: 0 },
                { opacity: 1, duration: 0.8 }
            );
        }, 0);
    }

    close() {
        const tl = gsap.timeline({
            onComplete: () => {
                this.ngZone.run(() => {
                    this.state.closeProject();
                });
            }
        });

        tl.to('.project-detail-panel', {
            x: '100%',
            duration: 0.6,
            ease: 'power3.in'
        }, 0);

        tl.to('.project-backdrop', {
            opacity: 0,
            duration: 0.6
        }, 0);
    }
}
