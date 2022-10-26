import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})

export class storesupplierMasterservice extends BaseHttp{
    storesupplierMasterUrl: string = "store-supplier-master";
    StoreNamesUrl: string = "store-names";
    productListurl : string = "product-names"
    categoriesUrl : string = "categories";


    getStores(Obj: any){
        return this.post<any>(this.storesupplierMasterUrl, Obj);
    }
    getStoreNames() {
        return this.get<any>(this.StoreNamesUrl);
      }
      getProductList(){
        return this.get<any>(this.productListurl)
    }
    getCategory(){
        return this.get<any>(this.categoriesUrl);
    }
    
}