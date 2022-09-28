import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhysicalStockCheckService } from './physical-stock-check.service';

@Component({
  selector: 'app-physical-stock-check',
  templateUrl: './physical-stock-check.component.html',
  styleUrls: ['./physical-stock-check.component.css']
})
export class PhysicalStockCheckComponent implements OnInit {
  physicalStockForm!: FormGroup;
  displayColumns: string[] = ['SKU_ID', 'Product_Name', 'Store_Name', 'Quantity_On_Hand', 'Physical_Verified_Quantity','Variance'];
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  physicalStockCheckData!: MatTableDataSource<any>;
  pipe = new DatePipe('en-US');
  storeNameList: any;
  productNameList: any;
  date = new Date();
  constructor(private router: Router,private formBuilder: FormBuilder,
    private physicalStockCheckService: PhysicalStockCheckService,) { }

  ngOnInit(): void {
    this.physicalStockForm = this.formBuilder.group({
      date: [""],
      storeName: [""],      
      productName: [''],
      SKU_ID: [''],
    });
    this.getStoresNamesList();
    this.getProductNamesList();
  }

  getStoresNamesList() {
    this.physicalStockCheckService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }

  getProductNamesList(){
    this.physicalStockCheckService.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }
 


  onPhysicalStockSubmit() {
    let inputObj = {
      "Date": this.pipe.transform(this.physicalStockForm.value.date, 'yyyy-MM-dd'),
      "Product_Name": this.physicalStockForm.value.productName,
      "Store_Name": this.physicalStockForm.value.storeName,
      "SKU_ID": this.physicalStockForm.value.SKU_ID,
      

    }
    this.physicalStockCheckService.getPhysicalStockCheck(inputObj).subscribe((response) => {
      console.log(response);
      this.physicalStockCheckData = new MatTableDataSource(response[0]);
      this.physicalStockCheckData.paginator = this.paginator;
      this.physicalStockCheckData.sort = this.sort;
    })
  }
  backButtonClick() {
    this.router.navigate(['transaction']);
  }

}
