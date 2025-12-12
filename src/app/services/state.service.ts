import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    isAboutOpen = signal(false);
    selectedProject = signal<Project | null>(null);

    toggleAbout() {
        this.isAboutOpen.update(v => !v);
    }

    setAbout(isOpen: boolean) {
        this.isAboutOpen.set(isOpen);
    }

    openProject(project: Project) {
        this.isAboutOpen.set(false); // Close about if open
        this.selectedProject.set(project);
    }

    closeProject() {
        this.selectedProject.set(null);
    }

    reset() {
        this.isAboutOpen.set(false);
        this.selectedProject.set(null);
    }
}
