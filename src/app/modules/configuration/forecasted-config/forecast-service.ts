

import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})


export class forecastService extends BaseHttp{
    forecastUrl: string = "forecast";
    StoreNamesUrl: string = "store-names";
    getStores(Obj: any){
        return this.post<any>(this.forecastUrl, Obj);
    }
    getStoreNames() {
        return this.get<any>(this.StoreNamesUrl);
      }
}
