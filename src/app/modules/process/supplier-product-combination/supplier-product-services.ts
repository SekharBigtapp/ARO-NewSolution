
import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseHttp {
    suppplierDataUrl: string = 'supplier-exclusion';
    StoreNamesUrl: string = "store-names";
    CategoryNameUrl:string ="categories";
    ProductNameUrl:string = "product-names";
    SubCategoryNameurl:string = "subcategories";
    saveSupplierUrl:string="supplier-exclusion/status";
   
  
    supplierSKU(data: any) {
      return this.post<any>(this.suppplierDataUrl, data);
    }
    getStoreNames() {
        return this.get<any>(this.StoreNamesUrl);
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
      saveSupplier(Obj:any){
        return this.post<any>(this.saveSupplierUrl,Obj);
      }
}