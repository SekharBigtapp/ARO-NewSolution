import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OptimizeReorderComponent } from './optimize-reorder/optimize-reorder.component';


@NgModule({
  declarations: [

    //DashboardComponent,
   // OptimizeReorderComponent,
   
  ],
  imports: [
    CommonModule, 
    DashBoardRoutingModule,   
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
  
})
export class DashBoardModule { }
