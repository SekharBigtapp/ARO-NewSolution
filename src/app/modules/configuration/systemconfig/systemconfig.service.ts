import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class SystemConfigService extends BaseHttp {
    reorderFrequencyUrl: string = "reorder-frequency";

    saveJobConfig(Obj: any) {
        return this.post<any>(this.reorderFrequencyUrl, Obj);
    }
}