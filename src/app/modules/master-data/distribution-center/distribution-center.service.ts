import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class distributionCenterService extends BaseHttp {
    distributionCenterUrl: string = "distribution-center";
    addNewDistributionUrl: string = "add-dcs"
    distributionfilter : string = "distribution-filter";

    getDistributionCenters(Obj: any) {
        return this.post<any>(this.distributionCenterUrl, Obj);
    }

    addNewDistribution(Obj: any) {
        return this.post<any>(this.addNewDistributionUrl, Obj);
    }

    getDistributionFilter(obj:any){
        return this.post<any>(this.distributionfilter, obj);
    }

}