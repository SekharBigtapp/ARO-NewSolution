import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ForecastedConfigComponent } from './forecasted-config/forecasted-config.component';
import { MonotonicConstraintsComponent } from './monotonic-constraints/monotonic-constraints.component';
import { SchedulingConfigComponent } from './scheduling-config/scheduling-config.component';
import { StoreStoreTransferConfigComponent } from './store-store-transfer-config/store-store-transfer-config.component';
import { SystemconfigComponent } from './systemconfig/systemconfig.component';



const routes: Routes = [

 // { path: '', component: ConfigurationComponent, },
  { path: 'systemConfig', component: SystemconfigComponent, },
  { path: 'storeTransfer', component: StoreStoreTransferConfigComponent, },
  { path: 'scheduling', component: SchedulingConfigComponent, },
  { path: 'monotonicconfig', component: MonotonicConstraintsComponent },
  { path: 'forecastconfig', component: ForecastedConfigComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
