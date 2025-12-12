import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects: Project[] = [
        {
            id: 1,
            number: "001",
            title: "Neon Horizon",
            category: "Competition, 1st Prize",
            client: "Bjarke Ingels Group",
            location: "Copenhagen, Denmark",
            year: "2025",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            extraImages: [
                "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2500&auto=format&fit=crop"
            ],
            description: "A futuristic exploration of light and shadow in a digital 3D space.",
            link: "#"
        },
        {
            id: 2,
            number: "002",
            title: "Urban Echo",
            category: "Competition",
            client: "Snøhetta",
            location: "Oslo, Norway",
            year: "2024",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
            extraImages: [
                "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2500&auto=format&fit=crop",
            ],
            description: "Rebranding a metropolis for the next century.",
            link: "#"
        },
        {
            id: 3,
            number: "003",
            title: "Velvet Void",
            category: "Private Commission",
            client: "Herzog & de Meuron",
            location: "Basel, Switzerland",
            year: "2024",
            image: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2670&auto=format&fit=crop",
            description: "An immersive e-commerce experience for high-end fashion.",
            link: "#"
        },
        {
            id: 4,
            number: "004",
            title: "Kinetic Soul",
            category: "Competition, Honorable Mention",
            client: "Zaha Hadid Architects",
            location: "London, UK",
            year: "2024",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            description: "Motion graphics that breathe life into static interfaces.",
            link: "#"
        },
        {
            id: 5,
            number: "005",
            title: "Abstract Logic",
            category: "Research",
            client: "OMA",
            location: "Rotterdam, Netherlands",
            year: "2023",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
            description: "Complex algorithms visualized through generative art.",
            link: "#"
        }
    ];

    constructor() { }

    getProjects(): Observable<Project[]> {
        return of(this.projects);
    }
}
