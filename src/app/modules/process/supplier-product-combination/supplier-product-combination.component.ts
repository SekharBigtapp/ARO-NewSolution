import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from './supplier-product-services';

@Component({
  selector: 'app-supplier-product-combination',
  templateUrl: './supplier-product-combination.component.html',
  styleUrls: ['./supplier-product-combination.component.css']
})
export class SupplierProductCombinationComponent implements OnInit {

  supplierForm!: FormGroup;
  displayColumns: string[] = ['store_name', 'supp_name', 'sku_id', 'prod_name','prod_cat','prod_subcat','lead_time','expc_delv_dt', 'Actions']
  supplierData!: MatTableDataSource<any>;
  overrideReorder!: any;
  pipe = new DatePipe('en-US');
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  minDate = new Date("");
  storeNameList: any;

  categoryNameList:any;
  productNameList:any;
  subCategoryNameList:any;

  constructor( private http: HttpClient, private supplierService:SupplierService ,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
      this.storeNameList = response;
    });

  }

  getCategoryList (){
    this.supplierService.getCategoryNames().subscribe((response) => {
      console.log(response);
      this.categoryNameList = response;
    })
  }

  getSubCategoryList (){
    let obj = { "Category_Name" :this.supplierForm.value.CategoryName}
    this.supplierService.getSubCategoryNames(obj).subscribe((response) => {
      
      //console.log(response);
      //alert ();
      this.subCategoryNameList = response;
    })
    
  }
  getProductNamesList(){
    this.supplierService.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    })
    
  }

  onChange(el: any, event: any) {
    console.log(el);
    console.log(event.checked);
    let obj: any;
    if (event.checked) {
      obj = {
        "id": el.id,
        //"Distance": el.Distance,
        "Status": 1
      }
    } else {
      obj = {
        "id": el.id,
        //"Distance": el.Distance,
        "Status": 0
      }
    }
    this.supplierService.supplierSKU(Object).subscribe((response => {
      console.log(response);
      this.onSupplierSubmit();
    }))
  }

  onSupplierSubmit (){

    let object = {
      "Date": this.pipe.transform(this.supplierForm.value.date, 'yyyy-MM-dd'),
      'supp_name': this.supplierForm.value.SupplierName,
      'store_name' : this.supplierForm.value.StoreName,
      'prod_cat' : this.supplierForm.value.CategoryName ,
      'prod_subcat' :  this.supplierForm.value.SubcategoryName ,
      'prod_name' : this. supplierForm.value.ProductName,
      'sku_id' :  this. supplierForm.value.SKU_CODE ,
      
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

