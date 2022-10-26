import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { __values } from 'tslib';

import { SystemConfigService } from './systemconfig.service';

export interface User {
  name: string;
}

@Directive({
  selector: '[matAutocomplete]',
  exportAs: 'matAutocomplete'
})
export class matAutocomplete {
  @Input() matAutocomplete: any;
}


@Component({
  selector: 'app-systemconfig',
  templateUrl: './systemconfig.component.html',
  styleUrls: ['./systemconfig.component.css']
})

export class SystemconfigComponent implements OnInit {
  systemConfiForm!: FormGroup;
  systemConfigFormFilter!: FormGroup;
  dailyForm!: FormGroup;
  weeklyForm!: FormGroup;
  monthlyForm!: FormGroup;
  pipe = new DatePipe('en-US');

  displayColumns: string[] = ['product_name', 'category', 'sub_category', 'frequency', 'weekly_day', 'Actions']

  checkvalue: boolean = true;
  productNameList: any;
  storenamelist: any;
  categoryList: any;
  subCategoryValues: any;
  productsNameList: any;
  subCategorysValues: any;
  categorysList: any;
  storesnamelist: any;
  subcatVal: any;
  reorderData!: MatTableDataSource<any>;
  pageSize = 10;

 

  datavalue: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  day: string[] = [];




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemConfigService: SystemConfigService
  ) { }

  ngOnInit(): void {

    this.systemConfiForm = this.formBuilder.group({
      ProductCateg: [''],
      SubCatege: [''],
      ProductName: [''],
      StoreName: [''],
      configdate: new FormControl(''),
      

    })
    this.systemConfigFormFilter= this.formBuilder.group({
      storename: [''],
      productCateg: [''],
      subcateg: [''],
      productname: [''],
    })

    this.getCategoryList();
    this.getCategorysList();
    this.getProductNamesList();
    this.getProductNameList();
    this.getStoreNameList();
    this.getStoreNamesList();

    this.dailyForm = this.formBuilder.group({
      noOfDays: ['1'],
      time: ['', Validators.required]
    });
    this.weeklyForm = this.formBuilder.group({
      date: ['1'],
      time: ['', Validators.required],
      weekDay: ['', Validators.required],
    });
    this.monthlyForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      monthCount: ['1']
    });

    this.onConfigFilterFormSubmit();

  }

  onclear() {
    this.systemConfiForm = this.formBuilder.group({
      ProductCateg: [''],
      SubCatege: [''],
      ProductName: [''],
      StoreName: [''],
      daily: [''],  

    })
  }
  onFilterclear(){
    this.systemConfigFormFilter= this.formBuilder.group({
      storename: [''],
      productCateg: [''],
      subcateg: [''],
      productname: [''],
    })
  }


  checkall(event: any) {
    console.log(event.target.value)
    let checkbox1 = document.getElementById("checkItemA") as HTMLInputElement;
    let checkbox2 = document.getElementById("checkItemB") as HTMLInputElement;
    let checkbox3 = document.getElementById("checkItemC") as HTMLInputElement;
    if (event.target.value == "on" && this.checkvalue) {
      checkbox1.checked = true;
      checkbox2.checked = true;
      checkbox3.checked = true;
      this.checkvalue = !this.checkvalue;
    } else {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = false;
      this.checkvalue = !this.checkvalue;
    }


  }
  backButtonClick() {
    this.router.navigate(['configurations']);
  }

  getStoreNameList() {
    this.systemConfigService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storenamelist = response;
    })
  }

  getStoreNamesList() {
    this.systemConfigService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storesnamelist = response;
    })
  }

  getCategoryList() {
    this.systemConfigService.getCategory().subscribe((response) => {
      console.log(response);
      this.categorysList = response;
      this.getSubCategorysList();
    })
  }

  getCategorysList() {
    this.systemConfigService.getCategory().subscribe((response) => {
      console.log(response);
      this.categoryList = response;
      this.getSubCategoryList();
    })
  }

  getSubCategoryList() {
    //debugger;
    console.log(this.systemConfiForm.value)
    let sub = {
      "prod_cat": this.systemConfiForm.value.ProductCateg,
    }
    this.systemConfigService.getSubCategory(sub).subscribe((response) => {
      console.log(response);
      this.subCategoryValues = response
    })
  }

  getSubCategorysList() {
    //debugger;
    console.log(this.systemConfiForm.value)
    let sub = {
      "prod_cat": this.systemConfigFormFilter.value.productCateg,
    }
    this.systemConfigService.getSubCategory(sub).subscribe((response) => {
      console.log(response);
      this.subCategorysValues = response
    })
  }

  getProductNamesList() {
    this.systemConfigService.getProductList().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }

  getProductNameList() {
    this.systemConfigService.getProductList().subscribe((response) => {
      console.log(response);
      this.productsNameList = response;
    });
  }

  // configaddFormSubmit() {
  //   let objs = {
  //     "category": this.systemConfiForm.value.ProductCateg,
  //     "subcategory": this.systemConfiForm.value.SubCatege,
  //     "product": this.systemConfiForm.value.ProductName,
  //     "store" : this.systemConfiForm.value.StoreName,

  //   }
  //   this.systemConfigService.saveJobConfig(objs).subscribe((response) => {
  //     let respon = response.data;
  //     for (let data of respon) {
  //       data.Date  = this.pipe.transform(data.Date, 'yyyy-MM-dd')
  //     }
  //     this.reorderData = new MatTableDataSource(respon);
  //     this.reorderData.paginator = this.paginator;
  //     this.reorderData.sort = this.sort;
  //   });
  // }

  onDailyFormSubmit() {
    console.log(this.systemConfiForm.value.configdate);
    let Obj = {
      "frequencycategory": this.systemConfiForm.value.configdate,
      "subcategory": this.systemConfiForm.value.SubCatege,
      // "weeklyday": "Sunday",
      // "weeklyno": this.dailyForm.value.noOfDays,
      "store": this.systemConfiForm.value.StoreName,
      "category": this.systemConfiForm.value.ProductCateg,
      "product": this.systemConfiForm.value.ProductName,
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.dailyForm.reset();
      this.dailyForm.controls['noOfDays'].setValue(1);
      this. onConfigFilterFormSubmit();
    })
  }
  onWeeklyFormSubmit() {
    console.log(this.weeklyForm.value);
    let Obj = {
      "frequencycategory": "weekly",
      "weeklyno": this.weeklyForm.value.date,
      "weeklyday": this.weeklyForm.value.weekDay,
      "category": this.systemConfiForm.value.ProductCateg,
      "subcategory": this.systemConfiForm.value.subcategory,
      "store": this.systemConfiForm.value.StoreName,
      "product": this.systemConfiForm.value.ProductName,
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.weeklyForm.reset();
      this.weeklyForm.controls['date'].setValue(1); 
      this. onConfigFilterFormSubmit();     
    })
  }
  onMonthlyFormSubmit() {    
    let Obj = {
      "frequencycategory": "monthly",
      "category": this.systemConfiForm.value.ProductCateg,
      "subcategory": this.systemConfiForm.value.SubCategories,
      "store": this.systemConfiForm.value.StoreName,
      "product": this.systemConfiForm.value.ProductName,
      "date": this.monthlyForm.value.date,
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.monthlyForm.reset();
      this.monthlyForm.controls['monthCount'].setValue(1);
      this. onConfigFilterFormSubmit();
    });
  }

  onConfigEdit(val:any){
    console.log(val);
    this.systemConfiForm = this.formBuilder.group({
      ProductCateg: val.category,
      SubCatege: val.sub_category,
      ProductName: val.product_name,
      StoreName: val.store_name,
          
    });
    
  }

  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onConfigFilterFormSubmit() {
    console.log(this.systemConfigFormFilter.value);
    let obj = {
      "category": this.systemConfigFormFilter.value.productCateg,
      "subcategory": this.systemConfigFormFilter.value.subcateg,
      "product": this.systemConfigFormFilter.value.productname,
      "store" : this.systemConfigFormFilter.value.storename,      
    }
    this.systemConfigService.getReorderFilterFrquency(obj).subscribe((response) => {  
      let respon = response.data;

       for (let data of respon) {
          data.Date  = this.pipe.transform(data.Date, 'yyyy-MM-dd')
       }
      
      this.reorderData = new MatTableDataSource(respon);   
      this.reorderData.paginator = this.paginator;
      this.reorderData.sort = this.sort;
    });

   


    // console.log(obj)
    // this.storeService.searchStores(obj).subscribe((response) => {
    //   for (let prod of response[0]) {
    //     prod.editMode = false;
    //   }
    //   this.processData = new MatTableDataSource(response[0]);
    //   console.log(this.processData);
    //   this.processData.paginator = this.paginator;
    //   this.processData.sort = this.sort;
    // })
  }
}
