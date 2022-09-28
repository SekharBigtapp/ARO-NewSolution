import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class SchedulingConfigService extends BaseHttp {
    jobSchedulerUrl: string = "job-schedule";
    jobConfigUrl: string = "job-config";

    getJobScheduler() {
        return this.get<any>(this.jobSchedulerUrl);
    }

    saveJobConfig(Obj: any) {
        return this.post<any>(this.jobConfigUrl, Obj);
    }

}
