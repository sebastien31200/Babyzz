import { Routes } from '@angular/router';

export const routes: Routes = [{path: 'grid', loadChildren:()=> import('./tilegrid/tilegrid-routing.module').then(m=>m.TileGridRoutingModule)},
{path: '', pathMatch:"full", redirectTo: 'grid'}];

