import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { BaseHttp } from "src/app/core/services/baseHttp.service";

@Injectable({
    providedIn: 'root',
})
export class PhysicalStockCheckService extends BaseHttp{
    
    physicalStockCheckUrl: string = 'physical-stock';
    StoreNamesUrl: string = "store-names";
    ProductNameUrl: string = "product-names";

    getPhysicalStockCheck(Obj: any){
        return this.post<any>(this.physicalStockCheckUrl, Obj);
    }

    getStoreNames() {
        return this.get<any>(this.StoreNamesUrl);
      }

    getProductNames(){
        return this.get<any>(this.ProductNameUrl);
    }  

    //constructor(private httpClient: HttpClient) { }

    // getPhysicalStockCheck(data: any) {
    //     const header = new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     });
    //     return this.httpClient.post(this.envurl + this.physicalStockCheckUrl, JSON.stringify(data), { headers: header }).
    //         pipe(
    //             map((data: any) => {
    //                 return data;
    //             }), catchError(error => {
    //                 console.log(error)
    //                 return throwError(() => new Error('Something went wrong!'));
    //             })
    //         )
    // }
}