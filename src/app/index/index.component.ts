import { Component, OnInit, HostListener, QueryList, ViewChildren, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { StateService } from '../services/state.service';
import { Project } from '../models/project.model';
import { gsap } from 'gsap';

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./index.component.css'],
    template: `
    <div class="min-h-screen bg-mukko-white w-full pt-32 px-6 md:px-12 pb-32 text-black">
        <div class="w-full mx-auto">
            
            <!-- Table Header -->
            <!-- Fixed Header -->
            <div class="fixed top-24 left-0 w-full bg-[#f5f5f5] z-20 border-b border-black px-6 md:px-12 pb-4 pt-4 mt-[-40px]">
                <div class="w-full mx-auto grid grid-cols-12 gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                    <div class="col-span-1">ID.</div>
                    <div class="col-span-3 md:col-span-2">Hvem?</div>
                    <div class="col-span-4 md:col-span-4">Projekt</div>
                    <div class="hidden md:block md:col-span-2">Hvor?</div>
                    <div class="hidden md:block md:col-span-1">Hvornår?</div>
                    <div class="col-span-4 md:col-span-2 text-right md:text-left">Type</div>
                </div>
            </div>

            <!-- Table Rows -->
            <div>
                <div *ngFor="let project of displayProjects; let i = index" 
                     (click)="openProject(project)"
                     #rowItem
                     class="project-row grid grid-cols-12 gap-4 py-3 border-b border-black/10 hover:bg-black hover:text-white transition-colors cursor-pointer items-baseline group opacity-0 translate-y-4">
                    
                    <div class="col-span-1 font-mono text-xs text-neutral-400 group-hover:text-neutral-500">{{ project.number }}</div>
                    <div class="col-span-3 md:col-span-2 font-bold uppercase text-xs md:text-sm truncate">{{ project.client }}</div>
                    <div class="col-span-4 md:col-span-4 font-bold uppercase text-xs md:text-sm truncate">{{ project.title }}</div>
                    <div class="hidden md:block md:col-span-2 text-xs uppercase text-neutral-500 group-hover:text-neutral-400 truncate">{{ project.location }}</div>
                    <div class="hidden md:block md:col-span-1 text-xs font-mono text-neutral-500 group-hover:text-neutral-400">{{ project.year }}</div>
                    <div class="col-span-4 md:col-span-2 text-xs uppercase text-neutral-500 group-hover:text-neutral-400 text-right md:text-left truncate">{{ project.category }}</div>

                </div>
            </div>
            
            <!-- Loading Indicator -->
            <div class="py-24 flex justify-center text-black/20 font-mono text-xs uppercase tracking-widest">
                Scroll for at se flere
            </div>
        </div>
    </div>
  `
})
export class IndexComponent implements OnInit, AfterViewInit {
    allProjects: Project[] = [];
    displayProjects: Project[] = [];
    @ViewChildren('rowItem') rowItems!: QueryList<ElementRef>;

    constructor(private projectService: ProjectService, private state: StateService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.allProjects = data;
                this.displayProjects = []; // Clear current
                this.loadInitial();
            },
            error: (err) => console.error('Error loading projects in Index:', err)
        });
    }

    ngAfterViewInit() {
        this.rowItems.changes.subscribe(list => {
            // console.log('Index rows changed. Count:', list.length);
            // Animate only the new rows that are hidden
            const newRows = document.querySelectorAll('.project-row');
            const hiddenRows: Element[] = [];
            newRows.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.opacity === '0') hiddenRows.push(el);
            });

            if (hiddenRows.length > 0) {
                gsap.to(hiddenRows, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            }
        });
    }

    loadInitial() {
        // Start with a few sets to fill screen
        for (let i = 0; i < 3; i++) {
            this.appendBatch();
        }
        this.cdr.detectChanges(); // Trigger change detection to update ViewChildren
    }

    loadMore() {
        this.appendBatch();
    }

    appendBatch() {
        const startIdx = this.displayProjects.length;
        // Clone logic for infinite scroll
        const batch = this.allProjects.map(p => ({ ...p, id: Math.random() }));
        this.displayProjects.push(...batch);
        // Force change detection to trigger ViewChildren changes event immediately
        this.cdr.detectChanges();
    }

    openProject(project: Project) {
        this.state.openProject(project);
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            this.loadMore();
        }
    }
}
