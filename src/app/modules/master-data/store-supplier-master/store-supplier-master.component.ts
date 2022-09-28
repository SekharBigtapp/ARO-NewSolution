import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { storesupplierMasterservice } from './store-supplier-master.service';

@Component({
  selector: 'app-store-supplier-master',
  templateUrl: './store-supplier-master.component.html',
  styleUrls: ['./store-supplier-master.component.css']
})
export class StoreSupplierMasterComponent implements OnInit {
  storesupplierMasterform!: FormGroup;
  displayColumns: string[] = ['Product_Key', 'Product_Name', 'SKU_ID', 'Category_Name', 'Subcategory_Name', 'Store_Key', 'Supplier_Key', 'Supplier_Name', 'City_Name', 'Actions']
  storesupplierMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private router: Router,private formBuilder: FormBuilder, private storesupplierMasterService: storesupplierMasterservice
  ) { }

  ngOnInit(): void {
    this.storesupplierMasterform = this.formBuilder.group({
      storename: [""],
      productname: [""],
      categoryname: [""],
      supplierID: [''],
      supplierName: [''],
    });
    
  }
  backButtonClick(){
    this.router.navigate(['masters']);
  }

  onStoreSupplierMasterSubmit() {
    let obj = {
      "Supplier_Name": this.storesupplierMasterform.value.supplierName,
      "Supplier_Key": this.storesupplierMasterform.value.supplierID,
      "Product_Name": this.storesupplierMasterform.value.productname,
      "Category_Name": this.storesupplierMasterform.value.categoryname     
    }
    this.storesupplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.storesupplierMasterData = new MatTableDataSource(response[0]);
      this.storesupplierMasterData.paginator = this.paginator;
      this.storesupplierMasterData.sort = this.sort;
    })
  }
}

