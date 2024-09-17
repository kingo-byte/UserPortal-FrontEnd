import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent, pathMatch: "full" }    
];
