import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class supplerMasterService extends BaseHttp {
    supplerMasterUrl: string = "supplier-master";
    addNewSupplierUrl: string = "add-suppliers";

    getStores(Obj: any) {
        return this.post<any>(this.supplerMasterUrl, Obj);
    }

    addNewSupplierData(Obj: any) {
        return this.post<any>(this.addNewSupplierUrl, Obj);
    }
}