import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { MasterDataComponent } from './modules/master-data/master-data.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ProcessComponent } from './modules/process/process.component';
import { TransactionComponent } from './modules/transaction/transaction.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { SystemconfigComponent } from './modules/configuration/systemconfig/systemconfig.component';
import { StoreStoreTransferConfigComponent } from './modules/configuration/store-store-transfer-config/store-store-transfer-config.component';
import { SchedulingConfigComponent } from './modules/configuration/scheduling-config/scheduling-config.component';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ProductMasterComponent } from './modules/master-data/product-master/product-master.component';
import { StoreMasterComponent } from './modules/master-data/store-master/store-master.component';
import { DistributionCenterComponent } from './modules/master-data/distribution-center/distribution-center.component';
import { SupplierMasterComponent } from './modules/master-data/supplier-master/supplier-master.component';
import { StoreSupplierMasterComponent } from './modules/master-data/store-supplier-master/store-supplier-master.component';
import { PriceMarkdownComponent } from './modules/transaction/price-markdown/price-markdown.component';
import { PhaseOutItemsComponent } from './modules/transaction/phase-out-items/phase-out-items.component';
import { NewItemLaunchDateComponent } from './modules/transaction/new-item-launch-date/new-item-launch-date.component';
import { StoreStoreTransferComponent } from './modules/transaction/store-store-transfer/store-store-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { VendorManagedInventoryComponent } from './modules/transaction/vendor-managed-inventory/vendor-managed-inventory.component';
import { StockRegisterComponent } from './modules/transaction/stock-register/stock-register.component';
import { PosSaleComponent } from './modules/transaction/pos-sale/pos-sale.component';
import { PromotionDetailsComponent } from './modules/transaction/promotion-details/promotion-details.component';
import { PhysicalStockCheckComponent } from './modules/transaction/physical-stock-check/physical-stock-check.component';
import { SideNavigationComponent } from './core/layout/side-navigation/side-navigation.component';
import { TopBarComponent } from './core/layout/top-bar/top-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StoreService } from './modules/process/storeservice';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OptimizeReorderComponent } from './modules/dashboard/optimize-reorder/optimize-reorder.component';
import { SupplierProductCombinationComponent } from './modules/process/supplier-product-combination/supplier-product-combination.component';
import { LoginComponent } from './modules/auth/login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AuthGuard } from './core/services/auth/auth.service';
import { DataStorageService } from './core/services/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
   HeaderComponent,
    FooterComponent,
    //DashboardComponent,
    //AdminComponent,
    ProcessComponent,
    TransactionComponent,
    PriceMarkdownComponent,
    PhaseOutItemsComponent,
    NewItemLaunchDateComponent,
    StoreStoreTransferComponent,
    VendorManagedInventoryComponent,
    StockRegisterComponent,
    PosSaleComponent,
    PromotionDetailsComponent,
    PhysicalStockCheckComponent,
    SideNavigationComponent,
    TopBarComponent,
    OptimizeReorderComponent,
    SupplierProductCombinationComponent,
    StoreSupplierMasterComponent,
    //LoginComponent,
    // MasterDataComponent,
    // ProductMasterComponent,
    // StoreMasterComponent,
    // DistributionCenterComponent,
    // SupplierMasterComponent,
    // StoreSupplierMasterComponent,
    // FormsModule
    // ConfigurationComponent,
    // SystemconfigComponent,
    // StoreStoreTransferConfigComponent,
    // SchedulingConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigurationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,


    
  ],
  providers: [DataStorageService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
