import { Injectable } from "@angular/core";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class SystemConfigService extends BaseHttp {
    reorderFrequencyUrl: string = "add-reorderfrequency";
    categoriesUrl : string = "categories";
    subCategoriesUrl : string = "subcategories"
    productListurl : string = "product-names"
    getreorderfilterFrequencyUrl: string = "getreorderfrequency";
    storenameListurl : string = "store-names";
    filter: string="add-reorderfrequency";
    editreorderFrequencyUrl: string ="single-reorder-update";


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

    getReorderFilterFrquency(Obj:any){
        return this.post<any>(this.getreorderfilterFrequencyUrl,Obj)
    }
    
    getStoreNames(){
        return this.get<any>(this.storenameListurl);
    }

    
    editReorderFrequency(Obj: any){
        return this.post<any>(this.editreorderFrequencyUrl, Obj);
    }
}