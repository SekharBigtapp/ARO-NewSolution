import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class NewLaunchItemService extends BaseHttp {
  newItemLaunchUrl: string = 'upcomminglaunch';
 

  getNewItemLauchData(obj:any) {
    return this.post<any>(this.newItemLaunchUrl, obj);
  }
 
}
