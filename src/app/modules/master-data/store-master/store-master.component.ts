import { AnimateTimings } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { storeMasterService } from './store-master.service';


export interface User {
  store_name: string;
 
}


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
  //storeNameList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  storeName = new FormControl<string | User>('');
  options: User[] = [];
  storeNameList: any;
  storeNamefield:any;
  autovalue:any;

  StoreMasterDropDownList: any;

  storeidFlag = true;
  storenameFlag = true;
  countryFlag = false;

  
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.storeNameList = this.storeName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const store_name = typeof value === 'string' ? value : value?.store_name;
        return store_name ? this._filter(store_name as string) : this.options.slice();
      }),
    );
    this.storeMasterform = this.formBuilder.group({
      country: [''],
      state: [''],
      city: [''],
      storeId: [''],
      storeName: ['']
    });
    this.getStoresNamesList();
   // this.fechingDataStoreInfo();
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
    this.storeNamefield='';
   this.autovalue="";
   
  }
  getStoresNamesList() {
    this.storeMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.options = response;
      
    });
  } 

  private _filter(store_name: string): User[] {
    const filterValue = store_name;
    console.log(filterValue);
    this.autovalue=filterValue;

    return this.options.filter(option => option.store_name.toLowerCase().includes(filterValue));
  }
  onStoreMasterSubmit() {
    this.storeMaster();
  }
  storeMaster() {   
    let obj = {};   
    if (this.autovalue == undefined) {     
      obj = {
        "store_cntry": this.storeMasterform.value.country,
        "store_region": this.storeMasterform.value.state,
        "store_city": this.storeMasterform.value.city,
        "store_id": this.storeMasterform.value.storeId,
       // "store_name": this.autovalue
       "store_name": this.storeMasterform.value.storeName
      }
  } else {   
   obj = {
      "store_cntry": this.storeMasterform.value.country,
      "store_region": this.storeMasterform.value.state,
      "store_city": this.storeMasterform.value.city,
      "store_id": this.storeMasterform.value.storeId,
      "store_name": this.autovalue
     
    }
  } 
    this.storeMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.storeData = new MatTableDataSource(response[0]);
      this.storeData.paginator = this.paginator;
      this.storeData.sort = this.sort;
      
    })
  }

  onChangeStoreId(event: Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.storeidFlag = true;
    this.storenameFlag = false;
    this.countryFlag = false;
   this.fechingDataStoreId((event.target as HTMLInputElement)?.value);
  
  }
  onChangeStoreName(storeName:any){
    console.log("store"+storeName.option.value);
    this.storeidFlag = false;
    this.storenameFlag = true;
    this.countryFlag = false;
   this.fechingDataStoreName(storeName.option.value);
   
  }

  onChangeCountry(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.storeidFlag = false;
    this.storenameFlag = false;
    this.countryFlag = true;
    let   countryObj = {
      "id":"",
      "name":"",
      "city":"",
      "cntry":(event.target as HTMLInputElement)?.value,
      "region":""
    }

    this.storeMasterService.getStoreFilter(countryObj).subscribe((response) => {
      console.log(response.data);
      // this.fechingCountryInfo(response.data[0]);
      // this.storeData = new MatTableDataSource(response[0]);
     this.StoreMasterDropDownList =response.data;
      // this.storeData.paginator = this.paginator;
      // this.storeData.sort = this.sort;
    })  

  }
 

  fechingDataStoreId(value:any){
    let obj = {};
   
       obj = {
        "id":value,
        "name":"",
        "city":"",
        "cntry":"",
        "region":""
      }

    
    console.log(obj);
    this.storeMasterService.getStoreFilter(obj).subscribe((response) => {
      console.log(response);
      this.fechingCountryInfo(response.data[0]);
      this.storeData = new MatTableDataSource(response[0]);
      // this.storeData.paginator = this.paginator;
      // this.storeData.sort = this.sort;
    })  
  }

  fechingDataStoreName(storeName:any){
    let obj = {};
   
       obj = {
        "id":"",
        "name":storeName,
        "city":"",
        "cntry":"",
        "region":""
      }

   
    console.log(obj);
    this.storeMasterService.getStoreFilter(obj).subscribe((response) => {
      console.log(response);
      this.fechingCountryInfo(response.data[0]);
      this.storeData = new MatTableDataSource(response[0]);
      // this.storeData.paginator = this.paginator;
      // this.storeData.sort = this.sort;
    })  
  }

  fechingCountryInfo(val:any){
    console.log(val);
    this.storeMasterform = this.formBuilder.group({
      country: val.store_cntry,
      state: val.store_region,
      city: val.store_city,
      storeName: val.store_name,     
      storeId:val.store_id
    });
    this.storeNamefield=val.store_name;
    console.log(this.storeMasterform);
  }

}
