import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewDistributionCenterComponent } from './distribution-center/add-new-distribution-center/add-new-distribution-center.component';
import { DistributionCenterComponent } from './distribution-center/distribution-center.component';
import { MasterDataComponent } from './master-data.component';
import { AddProductMasterComponent } from './product-master/add-product-master/add-product-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { AddNewStoreComponent } from './store-master/add-new-store/add-new-store.component';
import { StoreMasterComponent } from './store-master/store-master.component';
import { StoreSupplierMasterComponent } from './store-supplier-master/store-supplier-master.component';
import { AddNewSupplierComponent } from './supplier-master/add-new-supplier/add-new-supplier.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
const routes: Routes = [
  { path: '', component: MasterDataComponent },
  { path: 'productmaster', component: ProductMasterComponent },
  { path: 'storemaster', component: StoreMasterComponent },
  { path: 'distributionmaster', component: DistributionCenterComponent },
  { path: 'suppliermaster', component: SupplierMasterComponent },
  { path: 'storesupplymaster', component: StoreSupplierMasterComponent },
  { path: 'addNewProduct', component:AddProductMasterComponent},
  { path: 'addNewStore', component:AddNewStoreComponent},
  { path: 'addNewSupplier', component:AddNewSupplierComponent},
  { path: 'addNewDistribution', component:AddNewDistributionCenterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
