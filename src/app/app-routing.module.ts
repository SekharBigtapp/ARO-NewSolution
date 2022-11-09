import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.service';




const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],    
    loadChildren: () =>
    import('./modules/dashboard/dashboard.module').then((m) => m.DashBoardModule),
    
  },
  {
    path: 'masters',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/master-data/master-data.module').then((m) => m.MasterDataModule),
      
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/transaction/transaction.module').then((m) => m.TransactionModule)
  },

  {
    path: 'processdata',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/process/process.module').then((m) => m.ProcessModule)
  },
  {
    path: 'configurations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/configuration/configuration.module').then((m) => m.ConfigurationModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }



  

  // { path: '', component: LoginComponent },
  // { path: '', component: LoginComponent },
  // { path: '', component: DashboardComponent },
  //  { path: 'dashboard', component: DashboardComponent },
  // { path: 'optimizeReorder', component: OptimizeReorderComponent },
  // { path: 'process', component: ProcessComponent },
  // { path: 'transaction', component: TransactionComponent },
  // { path: 'admin', component: AdminComponent },
  // { path: 'pricemarkdown', component: PriceMarkdownComponent },
  // { path: 'phaseoutitem', component: PhaseOutItemsComponent },
  // { path: 'newlauchitem', component: NewItemLaunchDateComponent },
  // { path: 'store2storetransfer', component: StoreStoreTransferComponent },
  // { path: 'vendormanagedinventory', component: VendorManagedInventoryComponent },
  // { path: 'stockregister', component: StockRegisterComponent },
  // { path: 'possale', component: PosSaleComponent },
  // { path: 'promotiondetails', component: PromotionDetailsComponent },
  // { path: 'physicalstock', component: PhysicalStockCheckComponent },
  
 // { path: 'masters', component: MasterDataComponent },
  //{ path: 'systemConfig', component: SystemconfigComponent },
  // { path: 'productmaster', component:ProductMasterComponent},
  // { path: 'storemaster', component:StoreMasterComponent},
  // { path: 'distributionmaster', component:DistributionCenterComponent},
  // { path: 'suppliermaster', component:SupplierMasterComponent},
  // { path: 'storesupplymaster', component:StoreSupplierMasterComponent},
  // { path: 'systemConfig', component: SystemconfigComponent, },
  // { path: 'storeTransfer', component: StoreStoreTransferConfigComponent, },
  // { path: 'scheduling', component: SchedulingConfigComponent, },
  // { path: 'monotonicconfig', component: MonotonicConstraintsComponent },
  // { path: 'forecastconfig', component: ForecastedConfigComponent },
  // { path: 'supplierSKUCombination', component:SupplierProductCombinationComponent},
  // { path: 'addNewProduct', component:AddProductMasterComponent},
  // { path: 'addNewStore', component:AddNewStoreComponent},
  // { path: 'addNewSupplier', component:AddNewSupplierComponent},
  // { path: 'addNewDistribution', component:AddNewDistributionCenterComponent},

  
  // {
  //   path: 'masters',
  //   loadChildren: () =>
  //     import('./modules/master-data/master-data.module').then((m) => m.MasterDataModule)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
