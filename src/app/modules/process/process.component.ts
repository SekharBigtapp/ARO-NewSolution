import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './storeservice';
import { subscribeOn } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  processForm!: FormGroup;
  displayColumns: string[] = ['Store_Name', 'Category', 'SubCategory', 'Product_name', 'SKU_ID', 'Physical_Stock_on_Hand', 'Forecasted_Volume', 'Transit_Stock', 'Re_Order_Quantity', 'OverriderReorderQty',  'Supplier_Name', 'Actions']
  processData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  minDate = new Date("8-1-2022");
  storeNameList: any;

  categoryNameList:any;
  productNameList:any;
  subCategoryNameList:any;
  blanketOverrideForm! : FormGroup;
  constructor(private http: HttpClient, private storeService: StoreService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.processForm = this.formBuilder.group({
      date: [""],
      storeName: [""],
      ProductCateg: [''],
      SubCategories: [''],
      abcClass: [''],
      ProductName: [''],
      SKU_CODE: [''],
      CategoryName:[''],
      SubcategoryName:['']
    });    
    this.blanketOverrideForm = this.formBuilder.group({
      BlanketValue: [""],        
    });

    this.getStoresNamesList();
    this.getProductNamesList();
    this.getCategoryList();  

  }

  getStoresNamesList() {
    this.storeService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }

  getCategoryList (){
    this.storeService.getCategoryNames().subscribe((response) => {
      console.log(response);
      this.categoryNameList = response;
    })
  }

  getSubCategoryList (){
    let obj = { "Category_Name" :this.processForm.value.CategoryName}
    this.storeService.getSubCategoryNames(obj).subscribe((response) => {
      
      //console.log(response);
      //alert ();
      this.subCategoryNameList = response;
    })
    
  }
  getProductNamesList(){
    this.storeService.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    })
    
  }
  
  onBlanketSubmit(){
    //const overrideValue = this.blanketOverrideForm.value.BlanketValue;
    //alert();
    let obj = {
      "Date": this.pipe.transform(this.processForm.value.date, 'yyyy-MM-dd'),
      "Store_Name": "",
      "Category_Name": this.processForm.value.CategoryName,
      "Subcategory_Name": this.processForm.value.SubcategoryName,
      "Product_Name": this.processForm.value.ProductName,
      "SKU_ID": "",
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
      "Store_Name": this.processForm.value.storeName,
      "Category_Name": this.processForm.value.ProductCateg,
      "Subcategory_Name": this.processForm.value.SubCategories,
      "Product_Name": this.processForm.value.ProductName,
      "SKU_ID": this.processForm.value.SKU_CODE
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
    const myFormattedDate = this.pipe.transform(product.Time_key, 'yyyy-MM-dd');
    let prodObj = {
      "Time_Key": myFormattedDate,
      "Store_Key": product.Store_Key,
      "Product_Key": product.Product_Key,
      "Override_RQ": this.overrideReorder
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
