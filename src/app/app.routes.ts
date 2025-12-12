import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'index', component: IndexComponent }
];
