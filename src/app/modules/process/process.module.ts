import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';
import { StoreStoreTransferComponent } from '../transaction/store-store-transfer/store-store-transfer.component';
import { SupplierProductCombinationComponent } from './supplier-product-combination/supplier-product-combination.component';
import { NewItemLaunchDateComponent } from '../transaction/new-item-launch-date/new-item-launch-date.component';


@NgModule({
  declarations: [
    //ProcessComponent,
    //StoreStoreTransferComponent,
    //SupplierProductCombinationComponent,
   // NewItemLaunchDateComponent
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
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
export class ProcessModule { }
