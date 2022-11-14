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
  productNameList: any;
  subCategoryNameList: any;
  blanketOverrideForm!: FormGroup;

  ProductCateg = new FormControl<string | Product>('');
  categoryNameList: any;
  options: Product[] = [];  

  StoreName = new FormControl<string | Store>('');
  storeNameList: any;
  stores: Store[] = [];  

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
  }
 
  getStoresNamesList() {
    this.storeService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;

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
  }

  // displayFn(prod_cat: Prod_cat): string {
  //   return prod_cat && user.name ? user.name : '';
  // }

  private _filter(prod_cat: string): Product[] {
    const filterValue = prod_cat.toLowerCase();

    return this.options.filter(option => option.prod_cat.toLowerCase().includes(filterValue));
  }

  private _filterStores(store_name: string): Store[] {
    const filterValue = store_name.toLowerCase();

    return this.stores.filter(store => store.store_name.toLowerCase().includes(filterValue));
  }

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
      "prod_cat": this.processForm.value.ProductCateg,
    }
    this.storeService.getSubCategoryNames(sub).subscribe((response) => {
      console.log(response);
      this.subCategoryNameList = response
    })
  }
  getProductNamesList() {
    this.storeService.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    })

  }

  onBlanketSubmit() {
    //const overrideValue = this.blanketOverrideForm.value.BlanketValue;
    //alert();
    let obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": "",
      "prod_cat": this.processForm.value.CategoryName,
      "prod_subcat": this.processForm.value.SubcategoryName,
      "prod_name": this.processForm.value.ProductName,
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
  onSubmit() {
    console.log(this.processForm.value);
    let obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "store_name": this.processForm.value.store_name,
      "prod_cat": this.processForm.value.ProductCateg,
      "prod_subcat": this.processForm.value.SubCategories,
      "prod_name": this.processForm.value.ProductName,
      "sku_id": this.processForm.value.SKU_CODE
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
      "store_id": product.store_id,
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

}
