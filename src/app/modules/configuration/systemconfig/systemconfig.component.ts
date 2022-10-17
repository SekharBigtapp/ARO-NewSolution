import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { SystemConfigService } from './systemconfig.service';

@Component({
  selector: 'app-systemconfig',
  templateUrl: './systemconfig.component.html',
  styleUrls: ['./systemconfig.component.css']
})
export class SystemconfigComponent implements OnInit {
  systemConfiForm!: FormGroup;
  dailyForm!: FormGroup;
  weeklyForm!: FormGroup;
  monthlyForm!: FormGroup;

  displayColumns: string[] = ['product_name', 'category', 'sub_category', 'frequency',  'Actions']

  checkvalue: boolean = true;
  productNameList: any;
  categoryList : any;
  subCategoryValues : any;
  subcatVal : any;
  reorderData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

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
   
    })
    

    this.getCategoryList();
    //this.getSubCategoryList();
    this.getProductNamesList();

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

    this.getReorderFrequency();
    
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

  getCategoryList(){
    this.systemConfigService.getCategory().subscribe((response) => {
      console.log(response);
      this.categoryList = response;
      this.getSubCategoryList();
    })
  }

  getSubCategoryList(){
    //debugger;
    console.log(this.systemConfiForm.value)
    let sub = {
    "prod_cat":this.systemConfiForm.value.ProductCateg,
    }
    this.systemConfigService.getSubCategory(sub).subscribe((response) =>{
      console.log(response);
      this.subCategoryValues = response
    })
  }

  getProductNamesList(){
    this.systemConfigService.getProductList().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }

  getReorderFrequency(){
    this.systemConfigService.getReorderFrquency().subscribe((response) => {
      console.log(response);
      this.reorderData = new MatTableDataSource(response.data);
      this.reorderData.paginator = this.paginator;
      this.reorderData.sort = this.sort;
    });
  }


 
  onDailyFormSubmit() {
    console.log(this.dailyForm.value);
    let Obj = {
      "frequencycategory": "Daily",
      "subcategory": this.systemConfiForm.value.SubCatege,
      // "weeklyday": "Sunday",
      // "weeklyno": this.dailyForm.value.noOfDays,
      "category": this.systemConfiForm.value.ProductCateg,
      "product": this.systemConfiForm.value.ProductName,
      
    }
    
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.dailyForm.reset();
      this.dailyForm.controls['noOfDays'].setValue(1);

      this.getReorderFrequency();
    })
  }

  onWeeklyFormSubmit() {
    console.log(this.weeklyForm.value);
    let Obj = {
      "frequencycategory": "Weekly",
      "weeklyno": this.weeklyForm.value.date,
      "weeklyday": this.weeklyForm.value.weekDay,
      "category": this.systemConfiForm.value.ProductCateg,
      "subcategory": this.systemConfiForm.value.subcategory,
     
      "product": this.systemConfiForm.value.ProductName,
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.weeklyForm.reset();
      this.weeklyForm.controls['date'].setValue(1);

      this.getReorderFrequency();
    })
  }

  onMonthlyFormSubmit() {
    console.log(this.monthlyForm.value);
    let Obj = {
      "frequencycategory": "Monthly",
      "category": this.systemConfiForm.value.ProductCateg,
      "subcategory": this.systemConfiForm.value.SubCategories,
     
      "product": this.systemConfiForm.value.ProductName,
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.monthlyForm.reset();
      this.monthlyForm.controls['monthCount'].setValue(1);

      this.getReorderFrequency();
      
    })

  }

  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onConfigFormSubmit(){
    console.log(this.systemConfiForm.value);
    let obj = {
      "Category_Name": this.systemConfiForm.value.ProductCateg,
      "sub_category": this.systemConfiForm.value.SubCatege,
      "Product_Name": this.systemConfiForm.value.ProductName,

    }
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
