import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class NewLaunchItemService extends BaseHttp {
  newItemLaunchUrl: string = 'upcomminglaunch';
  CategoryNameUrl:string ="categories";
  ProductNameUrl:string = "product-names";
  SubCategoryNameurl:string = "subcategories";
  itemLunchFilter:string = "itemlaunch-filter";
 

  getNewItemLauchData(obj:any) {
    return this.post<any>(this.newItemLaunchUrl, obj);
  }

  getCategoryNames() {
    return this.get<any>(this.CategoryNameUrl);
  }
  getSubCategoryNames(sub:any){
    return this.post<any>(this.SubCategoryNameurl, sub);
  }
  getProductNames(){
    return this.get<any>(this.ProductNameUrl);
  }

  getItemLunchFilter(obj:any){
    return this.post<any>(this.itemLunchFilter, obj);
  }
 
}
