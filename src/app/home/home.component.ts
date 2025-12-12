import { Component, ElementRef, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
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

    constructor(private projectService: ProjectService, private state: StateService) { }

    openProject(project: Project): void {
        this.state.openProject(project);
    }



    ngOnInit(): void {
        this.projectService.getProjects().subscribe(data => {
            this.projects = data;
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initAnimations();
        }, 100);
    }

    initAnimations(): void {
        const tl = gsap.timeline();

        tl.from('.hero-text', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.2
        });

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
                        toggleActions: 'play none none reverse'
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
    }

    resetToHome(): void {
        // handled globally now
    }

    ngOnDestroy(): void {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
}
