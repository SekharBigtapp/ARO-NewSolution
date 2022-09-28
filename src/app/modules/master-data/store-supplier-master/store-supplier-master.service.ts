import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})

export class storesupplierMasterservice extends BaseHttp{
    storesupplierMasterUrl: string = "storetosupplier-master";

    getStores(Obj: any){
        return this.post<any>(this.storesupplierMasterUrl, Obj);
    }
}