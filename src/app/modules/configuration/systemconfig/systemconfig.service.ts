import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class SystemConfigService extends BaseHttp {
    reorderFrequencyUrl: string = "reorder-frequency";
    categoriesUrl : string = "categories";
    subCategoriesUrl : string = "subcategories"
    productListurl : string = "product-names"
    getreorderFrequencyUrl: string = "getreorderfrequency";


    saveJobConfig(Obj: any) {
        return this.post<any>(this.reorderFrequencyUrl, Obj);
    }
    
    getCategory(){
        return this.get<any>(this.categoriesUrl);
    }

    getSubCategory (sub:any){
        return this.post<any>(this.subCategoriesUrl, sub);
    }
    getProductList(){
        return this.get<any>(this.productListurl)
    }

    getReorderFrquency(){
        return this.get<any>(this.getreorderFrequencyUrl)
    }
}