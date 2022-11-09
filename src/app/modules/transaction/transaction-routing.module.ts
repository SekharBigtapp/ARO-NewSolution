import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewItemLaunchDateComponent } from './new-item-launch-date/new-item-launch-date.component';
import { PhaseOutItemsComponent } from './phase-out-items/phase-out-items.component';
import { PhysicalStockCheckComponent } from './physical-stock-check/physical-stock-check.component';
import { PosSaleComponent } from './pos-sale/pos-sale.component';
import { PriceMarkdownComponent } from './price-markdown/price-markdown.component';
import { PromotionDetailsComponent } from './promotion-details/promotion-details.component';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { StoreStoreTransferComponent } from './store-store-transfer/store-store-transfer.component';
import { TransactionComponent } from './transaction.component';
import { VendorManagedInventoryComponent } from './vendor-managed-inventory/vendor-managed-inventory.component';

const routes: Routes = [
 // { path: '', component: TransactionComponent },
 { path: 'pricemarkdown', component: PriceMarkdownComponent },
 { path: 'phaseoutitem', component: PhaseOutItemsComponent },
 { path: 'promotiondetails', component: PromotionDetailsComponent },
 { path: 'stockregister', component: StockRegisterComponent },
 { path: 'possale', component: PosSaleComponent },
 { path: 'physicalstock', component: PhysicalStockCheckComponent },
  //{ path: 'transaction', component: TransactionComponent },
  //{ path: 'vendormanagedinventory', component: VendorManagedInventoryComponent },
  { path: 'store2storetransfer', component: StoreStoreTransferComponent },  
  { path: 'newlauchitem', component: NewItemLaunchDateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
