import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './storeservice';
import { subscribeOn } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of, Subscription } from 'rxjs';
import {
  tap,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
export interface Product {
  prod_cat: string;  
}
export interface Store {
  store_name: string;  
}
export interface ProductName {
  prod_name: string;  
}

export interface SubCatName {
  prod_subcat: string;  
}

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  processForm!: FormGroup;
  displayColumns: string[] = ['store_name', 'prod_cat', 'prod_subcat', 'prod_name', 'sku_id', 'phy_Stock_on_hand', 'demand_forecast', 'transit_stock', 'proposed_qty', 'final_qty', 'Actions']
  processData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  minDate = new Date("8-1-2022");
  //storeNameList: any;
  //productNameList: any;
  //subCategoryNameList: any;
  blanketOverrideForm!: FormGroup;

  ProductCateg = new FormControl<string | Product>('');
  categoryNameList: any;
  options: Product[] = [];
  autoCategoryValue:any;
  autoProducatValue:any;
  autoStoreValue:any;
  autoSubCategoryValue:any;

  StoreName = new FormControl<string | Store>('');
  storeNameList: any;
  stores: Store[] = [];  

  ProductName = new FormControl<string | ProductName>('');
  productNameList: any;
  products: ProductName[] = [];

  SubCategories = new FormControl<string | SubCatName>('');
  subCategoryNameList: any;
  Subcategory: SubCatName[] = [];

  productNameField:any;
  subcategoryNameField:any;
  categoryNameField:any;
  storeNameField:any;

  constructor(private http: HttpClient, private storeService: StoreService,
    private formBuilder: FormBuilder) { }  

  ngOnInit(): void {   
   
    this.processForm = this.formBuilder.group({
      date: [''],
      store_name: [''],
      ProductCateg: [''],
      SubCategories: [''],
      abcClass: [''],
      ProductName: [''],
      SKU_CODE: [''],
      CategoryName : [''],
      SubcategoryName: [''],
    });
    this.blanketOverrideForm = this.formBuilder.group({
      BlanketValue: [""],
    });
    this.init();
    this.getStoresNamesList();
    this.getProductNamesList();    
    this.getCategoryList();
  }  
  init(){
    this.categoryNameList = this.ProductCateg.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_cat = typeof value === 'string' ? value : value?.prod_cat;
        return prod_cat ? this._filter(prod_cat as string) : this.options.slice();
      }),
    );

    this.storeNameList = this.StoreName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const store_name = typeof value === 'string' ? value : value?.store_name;
        return store_name ? this._filterStores(store_name as string) : this.stores.slice();
      }),
    );

    this.productNameList = this.ProductName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_name = typeof value === 'string' ? value : value?.prod_name;
        return prod_name ? this._filterProduct(prod_name as string) : this.products.slice();
      }),
    );

    this.subCategoryNameList = this.SubCategories.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_subcat = typeof value === 'string' ? value : value?.prod_subcat;
        return prod_subcat ? this._filterCategory(prod_subcat as string) : this.Subcategory.slice();
      }),
    );
  }
 
  getStoresNamesList() {
    this.storeService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.stores = response;

      

    });
  }
  onClear() {
    this.processForm = this.formBuilder.group({
      date: [''],
      store_name: [''],
      ProductCateg : [''],
      SubCategories: [''],
      abcClass: [''],
      ProductName: [''],
      SKU_CODE: [''],
      CategoryName: [''],
      SubcategoryName: [''],
    });
    
    this.productNameField = '';
    this.subcategoryNameField = '';
    this.categoryNameField = '';
    this.storeNameField = '';
    this.autoCategoryValue ="";
    this.autoSubCategoryValue = "";
    this.autoProducatValue = "";
    this.autoStoreValue = "";

  }

  // displayFn(prod_cat: Prod_cat): string {
  //   return prod_cat && user.name ? user.name : '';
  // }

  private _filter(prod_cat: string): Product[] {
    const filterValue = prod_cat;
    this.autoCategoryValue=filterValue;
    console.log( this.autoCategoryValue)
    return this.options.filter(option => option.prod_cat.includes(filterValue));
  }

  private _filterStores(store_name: string): Store[] {
    const filterValueStore = store_name;
    this.autoStoreValue=filterValueStore;
    
    console.log(this.autoStoreValue)
    return this.stores.filter(store => store.store_name.includes(filterValueStore));
  }

  private _filterProduct(prod_name: string): ProductName[] {
    const filterValueProduct = prod_name.toLowerCase();
    this.autoProducatValue=filterValueProduct;
    console.log(this.autoProducatValue);
    return this.products.filter(products => products.prod_name.toLowerCase().includes(filterValueProduct));
  }

  private _filterCategory(prod_subcat: string): SubCatName[] {
    const filterValueSub = prod_subcat;
    this.autoSubCategoryValue=filterValueSub;
    return this.Subcategory.filter(subProduct => subProduct.prod_subcat.includes(filterValueSub));
  }

  // onChangeSkuId(event: Event){
  //   console.log((event.target as HTMLInputElement)?.value);
  //   this.fechingDataSkuId((event.target as HTMLInputElement)?.value);
  // }

  // onChangeStoreName(event: Event){
  //   console.log((event.target as HTMLInputElement)?.value);
  //   this.fechingDataStoreName((event.target as HTMLInputElement)?.value);
  // }

  // onChangeDate(event: Event){
  //   console.log((event.target as HTMLInputElement)?.value);
  //   this.fechingDate((event.target as HTMLInputElement)?.value);
  // }

  getCategoryList() {
    this.storeService.getCategoryNames().subscribe((response) => {
      console.log(response);
      this.options = response;
      
      this.getSubCategorysList();
    })
  }


  getSubCategorysList() {
    //debugger;
    console.log(this.processForm.value)
    let sub = {
      "prod_cat": this.autoCategoryValue,
    }
    this.storeService.getSubCategoryNames(sub).subscribe((response) => {
      console.log(response);
      this.Subcategory = response
    })
  }
  getProductNamesList() {
    this.storeService.getProductNames().subscribe((response) => {
      console.log(response);
      this.products = response;
    })

  }
  onSubmit(){
   this.submit();
  }

//   fechingDate(value:any){
//     let  obj = {    
//       "date": value,
//       "store":"",
//       "category":"",
//       "subcategory":"",
//       "abc":"",
//       "skuid":"",
//       "product":""
//     }
//   console.log(obj);
//   this.storeService.getReorderFilter(obj).subscribe((response) => {
//     console.log(response);
//     this.fechingItemLunchInfo(response.data);
//     this.processData = new MatTableDataSource(response.data);
//     this.processData.paginator = this.paginator;
//      this.processData.sort = this.sort;
//   })  
//   }

//   fechingDataSkuId(value:any){ 
   
//     let  obj = {    
//       "date": "",
//       "store":"",
//       "category":"",
//       "subcategory":"",
//       "abc":"",
//       "skuid":value,
//       "product":""
//     }
//   console.log(obj);
//   this.storeService.getReorderFilter(obj).subscribe((response) => {
//     console.log(response);
//     this.fechingItemLunchInfo(response.data);
//     this.processData = new MatTableDataSource(response.data);
//     this.processData.paginator = this.paginator;
//      this.processData.sort = this.sort;
//   })  
//  }

//  fechingDataStoreName(value:any){ 
   
//   let  obj = {    
//     "date": "",
//     "store":value,
//     "category":"",
//     "subcategory":"",
//     "abc":"",
//     "skuid":"",
//     "product":""
//   }
// console.log(obj);
// this.storeService.getReorderFilter(obj).subscribe((response) => {
//   console.log(response);
//   this.fechingItemLunchInfo(response.data);
//   this.processData = new MatTableDataSource(response.data);
//   this.processData.paginator = this.paginator;
//    this.processData.sort = this.sort;
// })  
// }


  onBlanketSubmit() {
    
   let obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.autoStoreValue,
      "prod_cat": this.autoProducatValue,
      "prod_subcat":this.autoSubCategoryValue,
      "prod_name": this.autoStoreValue,
      "sku_id": "",
      "Blanket_Override": this.blanketOverrideForm.value.BlanketValue
    }
   

    this.storeService.getBlanketQty(obj).subscribe((response) => {

      this.processData = new MatTableDataSource(response[0]);
      console.log(this.processData);
      this.onSubmit();
      // this.processData.paginator = this.paginator;
      //this.processData.sort = this.sort;     

    })

  }
  submit() {
    alert("ok");
    let obj ={};
    if(this.autoCategoryValue == undefined && this.autoProducatValue == undefined && this.autoStoreValue == undefined){
     obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.processForm.value.store_name,
      "prod_cat": this.processForm.value.ProductCateg,
      "prod_subcat": this.processForm.value.SubCategories,
      "prod_name": this.processForm.value.ProductName,
      "sku_id": this.processForm.value.SKU_CODE
    }
  }else if(this.autoCategoryValue == undefined){
    obj = {      
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.autoStoreValue,
      "prod_cat": this.processForm.value.ProductCateg,
      "prod_subcat": this.processForm.value.SubCategories,
      "prod_name": this.autoProducatValue,
      "sku_id": this.processForm.value.SKU_CODE, 
              
    }
  }else if(this.autoProducatValue == undefined){
    obj = {        
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.autoStoreValue,
      "prod_cat": this.autoCategoryValue,
      "prod_subcat":this.autoSubCategoryValue,
      "prod_name": this.processForm.value.ProductName,
      "sku_id": this.processForm.value.SKU_CODE
     
              
    }
  }else if(this.autoStoreValue == undefined){
    obj = {  
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.processForm.value.store_name,
      "prod_cat": this.autoCategoryValue,
      "prod_subcat": this.autoSubCategoryValue,
      "prod_name": this.autoProducatValue,
      "sku_id": this.processForm.value.SKU_CODE        
    }
  }else if(this.autoCategoryValue == undefined && this.autoStoreValue == undefined ){
    obj = {  
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.processForm.value.store_name,
      "prod_cat": this.processForm.value.ProductCateg,
      "prod_subcat": this.processForm.value.SubCategories,
      "prod_name": this.autoProducatValue,
      "sku_id": this.processForm.value.SKU_CODE        
    }
  }else if(this.autoCategoryValue == undefined && this.autoProducatValue == undefined ){
    obj = {  
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.autoStoreValue,
      "prod_cat": this.processForm.value.ProductCateg,
      "prod_subcat": this.processForm.value.SubCategories,
      "prod_name": this.processForm.value.ProductName,
      "sku_id": this.processForm.value.SKU_CODE        
    }
  }else{
    obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.autoStoreValue,
      "prod_cat": this.autoCategoryValue,
      "prod_subcat": this.autoSubCategoryValue,
      "prod_name": this.autoProducatValue,
      "sku_id":this.processForm.value.SKU_CODE,
      "Blanket_Override": this.blanketOverrideForm.value.BlanketValue
    }
  }
    console.log(obj)
    this.storeService.searchStores(obj).subscribe((response) => {
      for (let prod of response[0]) {
        prod.editMode = false;
      }
      this.processData = new MatTableDataSource(response[0]);

      console.log(this.processData);
      this.processData.paginator = this.paginator;
      this.processData.sort = this.sort;
    })
  } 
    

  onProdEdit(product: any) {
    product.editMode = true;
    this.overrideReorder = product.Override_Reorder;
  }

  onProdSave(product: any) {
    const myFormattedDate = this.pipe.transform(product.Date, 'yyyy-MM-dd');
    let prodObj = {
      "Date": myFormattedDate,
      "article_id": product.article_id,
      //"Product_Key": product.Product_Key,
      "final_qty": this.overrideReorder
    }
    console.log(prodObj)
    this.storeService.saveProduct(prodObj).subscribe((response) => {
      console.log(response);
      this.onSubmit();
      this.overrideReorder = undefined;
      product.editMode = false;
    });
  }

  fechingItemLunchInfo(val:any){
    this.processForm = this.formBuilder.group({
      date: val.date,
      store_name: [''],
      ProductCateg: [''],
      SubCategories: [''],
      abcClass: [''],
      ProductName: [''],
      SKU_CODE: val.sku_id,
      CategoryName : [''],
      SubcategoryName: [''],
    });

    this.storeNameField = val.store_name;
  
  }

}
