import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { distributionCenterService } from './distribution-center.service';

@Component({
  selector: 'app-distribution-center',
  templateUrl: './distribution-center.component.html',
  styleUrls: ['./distribution-center.component.css']
})
export class DistributionCenterComponent implements OnInit {
  distributionCenterform!: FormGroup;
  displayColumns: string[] = ['dc_id', 'dc_name', 'dc_cntry', 'dc_region', 'dc_city', 'dc_long', 'dc_lat', 'Actions'];
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  distributionCenterData!: MatTableDataSource<any>;
  DistributionMasterDropDownList:any;

  disidFlag = true;
  disnameFlag = true;
  discountryFlag = false;

  constructor(
    private router: Router, private formBuilder: FormBuilder, private distributinoCenterService: distributionCenterService
  ) { }

  ngOnInit(): void {
    this.distributionCenterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      distributionCenterID: [''],
      distributionCentralName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onClear(){
    this.distributionCenterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      distributionCenterID: [''],
      distributionCentralName: ['']
    });
  }

  onChangeDistributionId(event:Event){
    console.log((event.target as HTMLInputElement)?.value);  
    this.disidFlag = true;
    this.disnameFlag = false;
    this.discountryFlag = false;
    this.fechingDataDistributionId((event.target as HTMLInputElement)?.value);
  }

  onChangeDistributionName(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.disidFlag = false;
    this.disnameFlag = true;
    this.discountryFlag = false;
    this.fechingDataDistributionName((event.target as HTMLInputElement)?.value);
  }
  onChangeCountry(event:Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.disidFlag = false;
    this.disnameFlag = false;
    this.discountryFlag = true;
    let   countryObj = {
      "id":"",
      "name":"",
      "city":"",
      "cntry":(event.target as HTMLInputElement)?.value,
      "region":""
    }

    this.distributinoCenterService.getDistributionFilter(countryObj).subscribe((response) => {
      console.log(response.data);
      // this.fechingCountryInfo(response.data[0]);
      // this.storeData = new MatTableDataSource(response[0]);
     this.DistributionMasterDropDownList =response.data;
      // this.storeData.paginator = this.paginator;
      // this.storeData.sort = this.sort;
    })  

  }

  fechingDataDistributionId(value:any){
    console.log(value);
    let obj={
      "id":value,
      "name":"",
      "city":"",
      "cntry":"",
      "region":""
  }
  this.distributinoCenterService.getDistributionFilter(obj).subscribe((response) => {
    console.log(response);
    this.fechingDistributionInfo(response.data[0]);
    this.distributionCenterData = new MatTableDataSource(response.data[0]);
    
  })
}

fechingDataDistributionName(value:any){
  console.log(value);
  let obj={
    "id":"",
    "name":value,
    "city":"",
    "cntry":"",
    "region":""
}
this.distributinoCenterService.getDistributionFilter(obj).subscribe((response) => {
  console.log(response);
  this.fechingDistributionInfo(response.data[0]);
  this.distributionCenterData = new MatTableDataSource(response.data[0]);
  
})
}

  onDistributionCenterSubmit() {
    console.log(this.distributionCenterform.value);
    let obj = {
      "dc_cntry": this.distributionCenterform.value.country,
      "dc_region": this.distributionCenterform.value.state,
      "dc_city": this.distributionCenterform.value.city,
      "dc_code": this.distributionCenterform.value.distributionCenterID,
      "dc_name": this.distributionCenterform.value.distributionCentralName
    }
    this.distributinoCenterService.getDistributionCenters(obj).subscribe((response) => {
      this.distributionCenterData = new MatTableDataSource(response[0]);
      this.distributionCenterData.paginator = this.paginator;
      this.distributionCenterData.sort = this.sort;
    })
  }
  fechingDistributionInfo(val:any){
    this.distributionCenterform = this.formBuilder.group({
      country: val.dc_cntry,
      state: val.dc_region,
      city: val.dc_city,
      distributionCenterID: val.dc_id,
      distributionCentralName: val.dc_name
    });
  
  }
 
}

