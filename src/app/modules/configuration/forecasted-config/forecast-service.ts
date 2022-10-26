

import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})


export class forecastService extends BaseHttp{
    forecastUrl: string = "forecast";
    StoreNamesUrl: string = "store-names";
    productListurl : string = "product-names"
    categoriesUrl : string = "categories";
    subCategoriesUrl : string = "subcategories"
    getStores(Obj: any){
        return this.post<any>(this.forecastUrl, Obj);
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

    getSubCategory (sub:any){
        return this.post<any>(this.subCategoriesUrl, sub);
    }
  
}
