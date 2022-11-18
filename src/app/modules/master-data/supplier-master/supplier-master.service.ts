import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class supplerMasterService extends BaseHttp {
    supplerMasterUrl: string = "supplier-master";
    addNewSupplierUrl: string = "add-suppliers";
    StoreNamesUrl: string = "store-names";
    supplierFilter: string ="supplier-filter";

    getStores(Obj: any) {
        return this.post<any>(this.supplerMasterUrl, Obj);
    }

    addNewSupplierData(Obj: any) {
        return this.post<any>(this.addNewSupplierUrl, Obj);
    }
    getStoreNames() {
        return this.get<any>(this.StoreNamesUrl);
      }

    getSupplierFilter(obj:any){
        return this.post<any>(this.supplierFilter, obj);
    }  
}