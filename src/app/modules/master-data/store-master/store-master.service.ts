import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class storeMasterService extends BaseHttp {
    storeMasterUrl: string = "store-master";
    addNewStoreMasterUrl: string = "add-stores";

    getStores(Obj: any) {
        return this.post<any>(this.storeMasterUrl, Obj);
    }

    addnewStores(Obj: any){
        return this.post<any>(this.addNewStoreMasterUrl,Obj);
    }
}