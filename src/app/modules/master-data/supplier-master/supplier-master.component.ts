import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { supplerMasterService } from './supplier-master.service';

export interface User {
  store_name: string;
}

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})

export class SupplierMasterComponent implements OnInit {
  supplierMasterform!: FormGroup;
  displayColumns: string[] = ['supp_id', 'supp_name', 'supp_cntry', 'supp_region', 'supp_city', 'supp_email', 'supp_phnum', 'Actions']
  supplierMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  storeNameList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  SupplierMasterDropDownList:any;

  supplieridFlag = true;
  suppliernameFlag = true;
  countryFlag = false;
  
  
  constructor(
    private router: Router, private formBuilder: FormBuilder, private supplierMasterService: supplerMasterService
  ) { }

  ngOnInit(): void {
    this.supplierMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      supplierID: [''],
      supplierName: [''],
      storeName: ['']
    });
    this.getStoresNamesList();
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onClear(){
    this.supplierMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      supplierID: [''],
      supplierName: [''],
      store_name: ['']
    });
  }

  getStoresNamesList() {
    this.supplierMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
      
    });

  }

  onChangeSupplierId(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.supplieridFlag = true;
    this.suppliernameFlag = false;
    this.countryFlag = false;
    this.fechingDataSupplierId((event.target as HTMLInputElement)?.value);
  }

  onChangeSupplierName(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.supplieridFlag = false;
    this.suppliernameFlag = true;
    this.countryFlag = false;
    this.fechingDataSupplierName((event.target as HTMLInputElement)?.value);
  }
  onChangeSupplierCity(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.supplieridFlag = false;
    this.suppliernameFlag = true;
    this.countryFlag = false;
    this.fechingDataSupplierCity((event.target as HTMLInputElement)?.value);
  }

  onSupplierMasterSubmit() {
    let obj = {
      "supp_cntry": this.supplierMasterform.value.country,
      "supp_region": this.supplierMasterform.value.state,
      "supp_city": this.supplierMasterform.value.city,
      "supp_id": this.supplierMasterform.value.supplierID,
      "supp_name": this.supplierMasterform.value.supplierName
    }
    this.supplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.supplierMasterData = new MatTableDataSource(response[0]);
      this.supplierMasterData.paginator = this.paginator;
      this.supplierMasterData.sort = this.sort;
    })
  }

  onChangeCountry(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.supplieridFlag = false;
    this.suppliernameFlag = false;
    this.countryFlag = true;
    let   countryObj = {
      "id":"",
      "name":"",
      "city":"",
      "cntry":(event.target as HTMLInputElement)?.value,
      "region":""
    }

    this.supplierMasterService.getSupplierFilter(countryObj).subscribe((response) => {
      console.log(response.data);
      // this.fechingCountryInfo(response.data[0]);
      // this.storeData = new MatTableDataSource(response[0]);
     this.SupplierMasterDropDownList =response.data;
      // this.storeData.paginator = this.paginator;
      // this.storeData.sort = this.sort;
    })  

  }

  fechingDataSupplierCity(value:any){
    let obj={
      "id":"",
      "name":"",
      "city":value,
      "cntry":"",
      "region":""
  }
  this.supplierMasterService.getSupplierFilter(obj).subscribe((response) => {
    console.log(response);
    this.fechingSupplierInfo(response.data[0]);
    this.supplierMasterData = new MatTableDataSource(response.data[0]);
    
  })
}
 

  fechingDataSupplierId(value:any){
    console.log(value);
    let obj={
      "id":value,
      "name":"",
      "city":"",
      "cntry":"",
      "region":""
  }
  this.supplierMasterService.getSupplierFilter(obj).subscribe((response) => {
    console.log(response);
    this.fechingSupplierInfo(response.data[0]);
    this.supplierMasterData = new MatTableDataSource(response.data[0]);
    
  })
}

fechingDataSupplierName(value:any){
  console.log(value);
  let obj={
    "id":"",
    "name":value,
    "city":"",
    "cntry":"",
    "region":""
}
this.supplierMasterService.getSupplierFilter(obj).subscribe((response) => {
  console.log(response);
  this.fechingSupplierInfo(response.data[0]);
  this.supplierMasterData = new MatTableDataSource(response.data[0]);
  
})
}

fechingSupplierInfo(val:any){
  this.supplierMasterform = this.formBuilder.group({
    country: val.supp_cntry,
    state: val.supp_region,
    city: val.supp_city,
    supplierID: val.supp_id,
    supplierName: val.supp_name,
    
  });
}
}
