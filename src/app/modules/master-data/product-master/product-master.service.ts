import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { BaseHttp } from "src/app/core/services/baseHttp.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ProductMasterService extends BaseHttp {
    productMasterUrl: string = "product-master";
    addNewProductUrl: string = "add-products";

    getproductMasterData(Obj: any) {
        return this.post<any>(this.productMasterUrl, Obj);
    }

    addNewproductMasterData(Obj: any){
        return this.post<any>(this.addNewProductUrl, Obj);
    }

}
