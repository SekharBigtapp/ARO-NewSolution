import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class StoreToStoreTransferConfigService extends BaseHttp {
    storeTransferUrl: string = "store-transfer";
    saveStoreTransferUrl: string = "store-transfer/save";
    DcToStoreTransferUrl: string =  "dcstore-transfer";
    saveDCTransferUrl: string = "dcstore-transfer/save"

    getStoreTransferData(data: any) {
        return this.post<any>(this.storeTransferUrl, data);
    }

    saveStoreTransfer(data: any) {
        return this.post<any>(this.saveStoreTransferUrl, data)
    }

    DcToStoreTransfer(data:any){
        return this.post<any>(this.DcToStoreTransferUrl, data)
    }
    DCsaveStoreTransfer(data: any) {
        return this.post<any>(this.saveDCTransferUrl, data)
    }

}
