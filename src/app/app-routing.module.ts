import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './modules/admin/admin.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { ForecastedConfigComponent } from './modules/configuration/forecasted-config/forecasted-config.component';
import { MonotonicConstraintsComponent } from './modules/configuration/monotonic-constraints/monotonic-constraints.component';
import { SchedulingConfigComponent } from './modules/configuration/scheduling-config/scheduling-config.component';
import { StoreStoreTransferConfigComponent } from './modules/configuration/store-store-transfer-config/store-store-transfer-config.component';
import { SystemconfigComponent } from './modules/configuration/systemconfig/systemconfig.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { OptimizeReorderComponent } from './modules/dashboard/optimize-reorder/optimize-reorder.component';
import { AddNewDistributionCenterComponent } from './modules/master-data/distribution-center/add-new-distribution-center/add-new-distribution-center.component';
import { DistributionCenterComponent } from './modules/master-data/distribution-center/distribution-center.component';
import { MasterDataComponent } from './modules/master-data/master-data.component';
import { AddProductMasterComponent } from './modules/master-data/product-master/add-product-master/add-product-master.component';
import { ProductMasterComponent } from './modules/master-data/product-master/product-master.component';
import { AddNewStoreComponent } from './modules/master-data/store-master/add-new-store/add-new-store.component';
// import { ProductMasterComponent } from './modules/master-data/product-master/product-master.component';
import { StoreMasterComponent } from './modules/master-data/store-master/store-master.component';
import { StoreSupplierMasterComponent } from './modules/master-data/store-supplier-master/store-supplier-master.component';
import { AddNewSupplierComponent } from './modules/master-data/supplier-master/add-new-supplier/add-new-supplier.component';
import { SupplierMasterComponent } from './modules/master-data/supplier-master/supplier-master.component';
import { ProcessComponent } from './modules/process/process.component';
import { SupplierProductCombinationComponent } from './modules/process/supplier-product-combination/supplier-product-combination.component';
import { NewItemLaunchDateComponent } from './modules/transaction/new-item-launch-date/new-item-launch-date.component';
import { PhaseOutItemsComponent } from './modules/transaction/phase-out-items/phase-out-items.component';
import { PhysicalStockCheckComponent } from './modules/transaction/physical-stock-check/physical-stock-check.component';
import { PosSaleComponent } from './modules/transaction/pos-sale/pos-sale.component';
import { PriceMarkdownComponent } from './modules/transaction/price-markdown/price-markdown.component';
import { PromotionDetailsComponent } from './modules/transaction/promotion-details/promotion-details.component';
import { StockRegisterComponent } from './modules/transaction/stock-register/stock-register.component';
import { StoreStoreTransferComponent } from './modules/transaction/store-store-transfer/store-store-transfer.component';
import { TransactionComponent } from './modules/transaction/transaction.component';
import { VendorManagedInventoryComponent } from './modules/transaction/vendor-managed-inventory/vendor-managed-inventory.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: '', component: LoginComponent },
  // { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'optimizeReorder', component: OptimizeReorderComponent },
  { path: 'process', component: ProcessComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'pricemarkdown', component: PriceMarkdownComponent },
  { path: 'phaseoutitem', component: PhaseOutItemsComponent },
  { path: 'newlauchitem', component: NewItemLaunchDateComponent },
  { path: 'store2storetransfer', component: StoreStoreTransferComponent },
  { path: 'vendormanagedinventory', component: VendorManagedInventoryComponent },
  { path: 'stockregister', component: StockRegisterComponent },
  { path: 'possale', component: PosSaleComponent },
  { path: 'promotiondetails', component: PromotionDetailsComponent },
  { path: 'physicalstock', component: PhysicalStockCheckComponent },
  
  { path: 'masters', component: MasterDataComponent },
  { path: 'systemConfig', component: SystemconfigComponent },
  { path: 'productmaster', component:ProductMasterComponent},
  { path: 'storemaster', component:StoreMasterComponent},
  { path: 'distributionmaster', component:DistributionCenterComponent},
  { path: 'suppliermaster', component:SupplierMasterComponent},
  { path: 'storesupplymaster', component:StoreSupplierMasterComponent},
  { path: 'systemConfig', component: SystemconfigComponent, },
  { path: 'storeTransfer', component: StoreStoreTransferConfigComponent, },
  { path: 'scheduling', component: SchedulingConfigComponent, },
  { path: 'monotonicconfig', component: MonotonicConstraintsComponent },
  { path: 'forecastconfig', component: ForecastedConfigComponent },
  { path: 'supplierSKUCombination', component:SupplierProductCombinationComponent},
  { path: 'addNewProduct', component:AddProductMasterComponent},
  { path: 'addNewStore', component:AddNewStoreComponent},
  { path: 'addNewSupplier', component:AddNewSupplierComponent},
  { path: 'addNewDistribution', component:AddNewDistributionCenterComponent},

  {
    path: 'configurations',
    loadChildren: () =>
      import('./modules/configuration/configuration.module').then((m) => m.ConfigurationModule)
  },
  {
    path: 'masters',
    loadChildren: () =>
      import('./modules/master-data/master-data.module').then((m) => m.MasterDataModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
