import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith } from 'rxjs';
import { SupplierService } from './supplier-product-services';

export interface Store {
  store_name: string; 
}
export interface Product {
  prod_name: string; 
}
export interface category {
  prod_cat: string;  
}


@Component({
  selector: 'app-supplier-product-combination',
  templateUrl: './supplier-product-combination.component.html',
  styleUrls: ['./supplier-product-combination.component.css']
})
export class SupplierProductCombinationComponent implements OnInit {

  supplierForm!: FormGroup;
  displayColumns: string[] = ['store_name', 'supp_name', 'sku_id', 'prod_name','prod_cat','prod_subcat','lead_time','expc_delv_dt', 'tfr_avail']
  supplierData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  minDate = new Date("");
  //storeNameList: any;

  categoryNameList:any;
  //productNameList:any;
  subCategoryNameList:any;

  storename = new FormControl<string | Store>('');
  Storeoptions: Store[] =[];
 storeNameList: any;

  productname = new FormControl<string | Product>('');
  ProductOptions: Product[] = [];
  productNameList: any;

  categoryname = new FormControl<string | category>('');
  categoryOption: category[] = [];
  
  categoryList: any;
  productnamefield: any;
  storenamefield:any;
  categorynamefield:any;

  productvalue:any;
  storevalue:any;
  categoryvalue:any;

  

  constructor( private http: HttpClient, private supplierService:SupplierService ,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.storeNameList = this.storename.valueChanges.pipe(
      startWith(''),
      map(value => {
        const store_name = typeof value === 'string' ? value : value?.store_name;
        return store_name ? this._filterstore(store_name as string) : this.Storeoptions.slice();
      }),
    );
    this.productNameList = this.productname.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_name = typeof value === 'string' ? value : value?.prod_name;
        return prod_name ? this._filterproduct(prod_name as string) : this.ProductOptions.slice();
      }),
    );
    this.categoryList = this.categoryname.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_cat = typeof value === 'string' ? value : value?.prod_cat;
        return prod_cat ? this._filtercategory(prod_cat as string) : this.categoryOption.slice();
      }),
    );
    this.supplierForm= this.formBuilder.group ({
      date: [""],
      SupplierName : [''],
      StoreName: [''],
      CategoryName: [''],
      SubcategoryName: [''],
      ProductName:[''],
      SKU_CODE: [''],
    });
    this.getStoresNamesList();
    this.getProductNamesList();
    this.getCategoryList();  
  }

  getStoresNamesList() {
    this.supplierService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.Storeoptions = response;
    });

  }

  getCategoryList() {
    this.supplierService.getCategoryNames().subscribe((response) => {
      console.log(response);
      this.categoryOption = response;
      this.getSubCategorysList();
    })
  }


  getSubCategorysList() {
    //debugger;
    console.log(this.supplierForm.value)
    let sub = {
      "prod_cat":  this.categoryvalue,
    }
    this.supplierService.getSubCategoryNames(sub).subscribe((response) => {
      console.log(response);
      this.subCategoryNameList = response
    })
  }
  onClear(){
    this.supplierForm= this.formBuilder.group ({
      date: [""],
      SupplierName : [''],
      StoreName: [''],
      CategoryName: [''],
      SubcategoryName: [''],
      ProductName:[''],
      SKU_CODE: [''],
    });

    this.productnamefield = '';
    this.storenamefield = '';
    this.categorynamefield = '';
    this.productvalue = "";
    this.storevalue = "";
    this.categoryvalue = "";
  }

 
  getProductNamesList(){
    this.supplierService.getProductNames().subscribe((response) => {
      console.log(response);
      this.ProductOptions = response;
    })
    
  }

  private _filterstore(store_name: string): Store[] {
    const filterValue = store_name.toLowerCase();
    this.storevalue=filterValue;
    console.log(this.storevalue)
    return this.Storeoptions.filter(store => store.store_name.toLowerCase().includes(filterValue));
  }

  private _filterproduct(prod_name: string): Product[] {
    const filterValue1 = prod_name.toLowerCase();
    this.productvalue=filterValue1;
    console.log(this.productvalue);
    return this.ProductOptions.filter(products => products.prod_name.toLowerCase().includes(filterValue1));
  }

  private _filtercategory(prod_cat: string): category[] {
    const filterValue2 = prod_cat.toLowerCase();
    this.categoryvalue=filterValue2;
    console.log(this.categoryvalue);
    return this.categoryOption.filter(category => category.prod_cat.toLowerCase().includes(filterValue2));
  }


  onChange(el: any) {
   
    let obj = {
      "Date": el.Date,
      "article_id": el.sku_id,
      "tfr_avail": el.tfr_avail
    }
    this.supplierService.saveSupplier(obj).subscribe((response => {
      console.log(response);
      this.onSupplierSubmit();
    }))
  }
  onSupplierSubmit(){
    this.SupplierSubmit();
  }



  SupplierSubmit (){

    let object= {};

    if (this.productvalue == undefined && this.storevalue == undefined && this.categoryvalue == undefined){

     object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.supplierForm.value.StoreName,
      'prod_cat' : this.supplierForm.value.CategoryName ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this. supplierForm.value.ProductName,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }
  }else if(this.productvalue == undefined){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.storevalue,
      'prod_cat' : this.categoryvalue ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this. supplierForm.value.ProductName,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,      
    }
  }else if(this.storevalue == undefined){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.supplierForm.value.StoreName,
      'prod_cat' : this.categoryvalue ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' :this.productvalue,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,      
    }
  } else if(this.categoryvalue == undefined){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.storevalue,
      'prod_cat' : this.supplierForm.value.CategoryName ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this.productvalue,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }
  }else if(this.productvalue == undefined && this.storevalue == undefined ){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.supplierForm.value.StoreName,
      'prod_cat' : this.categoryvalue ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this. supplierForm.value.ProductName,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }
  }else if(this.storevalue == undefined && this.categoryvalue == undefined){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.supplierForm.value.StoreName,
      'prod_cat' : this.supplierForm.value.CategoryName ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this.productvalue,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }

  }else if(this.productvalue == undefined && this.categoryvalue == undefined ){
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.storevalue,
      'prod_cat' : this.supplierForm.value.CategoryName ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this. supplierForm.value.ProductName,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }
  }else{
    object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.storevalue,
      'prod_cat' : this.categoryvalue ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this.productvalue,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
    }
  }

    this.supplierService.supplierSKU(object).subscribe((response) => {
     
      this.supplierData = new MatTableDataSource(response[0]);
      console.log(this.supplierData);
      this.supplierData.paginator = this.paginator;
      this.supplierData.sort = this.sort;
    })
  }
  
}
function getStoreNames() {
  throw new Error('Function not implemented.');
}

