import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OptimizeReorderComponent } from './optimize-reorder/optimize-reorder.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'optimizeReorder', component: OptimizeReorderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
