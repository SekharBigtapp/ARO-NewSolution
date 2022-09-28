import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class StoreTransferService extends BaseHttp {
  StoreTransferNameUrl: string = "interstore-config";
  StoreNamesUrl: string = "store-names";
  ProductNameUrl: string = "product-names";
  updateQtyUrl: string = "interstore-config/edit";

  getStoreTransferName(Obj: any){
    return this.post<any>(this.StoreTransferNameUrl, Obj);
  }
  getStoreNames() {
    return this.get<any>(this.StoreNamesUrl);
  }
  getProductNames(){
    return this.get<any>(this.ProductNameUrl);
  }  

  saveProduct(prod: any) {
    return this.post<any>(this.updateQtyUrl, prod);
  } 
  
}
