import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewItemLaunchDateComponent } from '../transaction/new-item-launch-date/new-item-launch-date.component';
import { StoreStoreTransferComponent } from '../transaction/store-store-transfer/store-store-transfer.component';
import { ProcessComponent } from './process.component';
import { SupplierProductCombinationComponent } from './supplier-product-combination/supplier-product-combination.component';

const routes: Routes = [
    { path: 'process', component: ProcessComponent },
    { path: 'store2storetransfer', component: StoreStoreTransferComponent },
    { path: 'supplierSKUCombination', component:SupplierProductCombinationComponent},
    { path: 'newlauchitem', component: NewItemLaunchDateComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
