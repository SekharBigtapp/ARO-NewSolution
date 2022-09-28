import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionCenterComponent } from './distribution-center/distribution-center.component';
import { MasterDataComponent } from './master-data.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { StoreMasterComponent } from './store-master/store-master.component';
import { StoreSupplierMasterComponent } from './store-supplier-master/store-supplier-master.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
const routes: Routes = [
  { path: '', component: MasterDataComponent },
  { path: 'productmaster', component: ProductMasterComponent },
  { path: 'storemaster', component: StoreMasterComponent },
  { path: 'distributionmaster', component: DistributionCenterComponent },
  { path: 'suppliermaster', component: SupplierMasterComponent },
  { path: 'storesupplymaster', component: StoreSupplierMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
