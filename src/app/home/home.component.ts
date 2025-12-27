import { Component, ElementRef, OnInit, ViewChildren, ViewChild, QueryList, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { StateService } from '../services/state.service';
import { Project } from '../models/project.model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    projects: Project[] = [];
    @ViewChildren('projectItem') projectItems!: QueryList<ElementRef>;
    @ViewChildren('projectImage') projectImages!: QueryList<ElementRef>;
    @ViewChild('skottLogo') skottLogo!: ElementRef;
    @ViewChild('skydsgaardLogo') skydsgaardLogo!: ElementRef;

    constructor(private projectService: ProjectService, private state: StateService, private cdr: ChangeDetectorRef) { }

    openProject(project: Project): void {
        this.state.openProject(project);
    }

    ngOnInit(): void {
        this.projectService.getProjects().subscribe({
            next: (data) => {
                this.projects = data.filter(project => project.showOnMainPage);
                this.cdr.detectChanges(); // Force update so ViewChildren are found
            },
            error: (err) => console.error('Error loading projects in Home:', err)
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initStaticAnimations();
        }, 100);

        // Listen for changes to the project list
        this.projectItems.changes.subscribe(list => {
            // console.log('ViewChildren changes detected. Count:', list.length);
            if (list.length > 0) {
                this.initProjectAnimations();
            }
        });
    }

    initStaticAnimations(): void {
        const tl = gsap.timeline();

        // Animate Skott logo first
        if (this.skottLogo) {
            tl.fromTo(this.skottLogo.nativeElement,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out'
                }, 0);
        }

        // Then animate Skydsgaard logo
        if (this.skydsgaardLogo) {
            tl.fromTo(this.skydsgaardLogo.nativeElement,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out'
                }, 0.4); // 0.4s delay after Skott starts
        }

        // Then animate the subtitle text
        tl.from('.hero-text', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.2
        }, 0.8);
    }

    initProjectAnimations(): void {
        // console.log('Animating projects. Items:', this.projectItems.length);
        if (this.projectItems.length === 0) return;

        this.projectItems.forEach((item, index) => {
            const el = item.nativeElement;
            const image = el.querySelector('.project-img');

            gsap.fromTo(el,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                        // markers: true // Debug markers
                    }
                }
            );

            if (image) {
                gsap.to(image, {
                    scale: 1.1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }
        });

        ScrollTrigger.refresh();
    }

    resetToHome(): void {
        // handled globally now
    }

    ngOnDestroy(): void {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
}
