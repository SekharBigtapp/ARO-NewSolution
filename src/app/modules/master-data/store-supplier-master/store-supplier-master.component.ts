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
  displayColumns: string[] = ['prod_name', 'sku_id', 'prod_cat', 'prod_subcat', 'store_id', 'store_name','supp_id', 'supp_name', 'supp_city', 'Actions']
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
      "supplier_name": this.storesupplierMasterform.value.supplierName,
      "supplier_id": this.storesupplierMasterform.value.supplierID,
      "product": this.storesupplierMasterform.value.productname,
      "category": this.storesupplierMasterform.value.categoryname,
      "store": this.storesupplierMasterform.value.storename     
    }
    this.storesupplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.storesupplierMasterData = new MatTableDataSource(response.data);
      this.storesupplierMasterData.paginator = this.paginator;
      this.storesupplierMasterData.sort = this.sort;
    })
  }
}

