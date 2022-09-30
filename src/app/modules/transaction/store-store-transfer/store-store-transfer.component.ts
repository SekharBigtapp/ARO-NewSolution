import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StoreTransferService } from './store-store-transfer.services';

@Component({
  selector: 'app-store-store-transfer',
  templateUrl: './store-store-transfer.component.html',
  styleUrls: ['./store-store-transfer.component.css']
})
export class StoreStoreTransferComponent implements OnInit {
  storeTransferfrom!: FormGroup;
  displayColumns: string[] = ['prod_name', 'sku_id', 'store_name', 'store_id', 'phy_stock_on_hand','Transfer_Qty','Transfer_to_Store','Actions']
  storeTransferMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  storeNameList: any;
  productNameList: any;
  overridestore: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  pipe = new DatePipe('en-US');
  Time_Key = new Date();

  constructor(
    private router: Router,private formBuilder: FormBuilder, private storetransferservice: StoreTransferService
  ) { }

  ngOnInit(): void {
    this.storeTransferfrom = this.formBuilder.group({
      Time_Key: [""],
      Store_Name: [""],
      Store_Key: [""],
      SKU_ID: [''],
      Product_Name: [''],
      Product_Key: [''],
      transferqty: [''],
     
    });
    this.getStoresNamesList();
    this.getProductNamesList();
  }
  getStoresNamesList() {
    this.storetransferservice.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }

  getProductNamesList(){
    this.storetransferservice.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }
 

  onStoreSupplierMasterSubmit() {
    let obj = {
      "Date": this.pipe.transform(this.storeTransferfrom.value.Time_Key, 'yyyy-MM-dd'),
      "store_name": this.storeTransferfrom.value.Store_Name,
      "store_id": this.storeTransferfrom.value.Store_Key,
      "sku_id": this.storeTransferfrom.value.SKU_ID,
      "prod_name":this.storeTransferfrom.value.Product_Name,
      // "Product_Key": this.storeTransferfrom.value.Product_Key,
      // "transferqty": "",
      // "Transfer_Qty_Name":this.storeTransferfrom.value.Store_Name,
    }
    this.storetransferservice.getStoreTransferName(obj).subscribe((response) => {
      console.log(response);  
      this.storeTransferMasterData = new MatTableDataSource(response[0]);
      this.storeTransferMasterData.paginator = this.paginator;
      this.storeTransferMasterData.sort = this.sort;
    })
  }
  onProdEdit(product: any) {
    product.editMode = true;     
  }
  onProdSave(product: any) {   
    const myFormattedDate = this.pipe.transform(product.date, 'yyyy-MM-dd');
    const Transfer_Qty=this.storeTransferfrom.value.transferqty;
    const Store_Name= this.storeTransferfrom.value.Store_Name;
    let prodObj = {
      "date": myFormattedDate,
      "from_store_key": product.store_id,
      "to_store_key":Store_Name,
      "article_id": product.sku_id,      
      "transferQty":Transfer_Qty,      
    }
    console.log(prodObj)
    this.storetransferservice.saveProduct(prodObj).subscribe((response) => {
      console.log(response);
      this.overridestore = undefined;
      product.editMode = false;
      this.storeTransferfrom.value.Store_Name= "";      
      this.onStoreSupplierMasterSubmit();
      
      // this.qtyClear = document.getElementById('transferqty') as HTMLElement;
      // this.qtyClear.value="";
      this.storeTransferfrom.controls['transferqty'].reset();
      this.storeTransferfrom.controls['Store_Name'].reset();
    });
  } 
  
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
