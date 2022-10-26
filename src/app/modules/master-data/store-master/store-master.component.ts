import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { storeMasterService } from './store-master.service';

@Component({
  selector: 'app-store-master',
  templateUrl: './store-master.component.html',
  styleUrls: ['./store-master.component.css']
})
export class StoreMasterComponent implements OnInit {
  storeMasterform!: FormGroup;
  displayColumns: string[] = ['store_id', 'store_name', 'store_city', 'store_region', 'store_cntry', 'store_long', 'store_lat', 'Actions']
  storeData!: MatTableDataSource<any>;
  pageSize = 10;
  storeNameList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.storeMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      storeId: [''],
      storeName: ['']
    });
    this.getStoresNamesList();
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onclear(){
    this.storeMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      storeId: [''],
      storeName: ['']
    });
  }
  getStoresNamesList() {
    this.storeMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
      
    });

  }
  onStoreMasterSubmit() {
    let obj = {
      "store_cntry": this.storeMasterform.value.country,
      "store_region": this.storeMasterform.value.state,
      "store_city": this.storeMasterform.value.city,
      "store_id": this.storeMasterform.value.storeId,
      "store_name": this.storeMasterform.value.storeName
    }
    this.storeMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.storeData = new MatTableDataSource(response[0]);
      this.storeData.paginator = this.paginator;
      this.storeData.sort = this.sort;
    })
  }
}
