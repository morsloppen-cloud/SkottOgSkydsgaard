import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient);

    getProjects(): Observable<Project[]> {
        return this.http.get<{ projects: Project[] }>('data/projects.json').pipe(
            map(response => {
                console.log('ProjectService Raw Response:', response);
                return response.projects;
            })
        );
    }
}
