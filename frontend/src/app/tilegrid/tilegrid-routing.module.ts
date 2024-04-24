import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TilegridComponent } from './tilegrid.component';

const routes: Routes = [{path: '', component: TilegridComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TileGridRoutingModule { }
