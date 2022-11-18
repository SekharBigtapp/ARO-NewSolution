import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forecastService } from './forecast-service';


@Component({
  selector: 'app-forecasted-config',
  templateUrl: './forecasted-config.component.html',
  styleUrls: ['./forecasted-config.component.css']
})
export class ForecastedConfigComponent implements OnInit {

  pipe = new DatePipe('en-US');
  forecastForm!: FormGroup;
  displayColumns: string[] = ['date', 'store_name', 'prod_name', 'sales_qty', 'demand_forecast', 'p10_demand_forecast', 'p50_demand_forecast', 'p90_demand_forecast', 'P10Variance', 'P50Variance', 'P90Variance'];
  forecastMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  isPTenValue: boolean = true;
  isPFiftyValue: boolean = false;
  isPNintyValue: boolean = false;
  storeNameList: any;
  categorysList:any;
  subCategorysValues:any;
  productNameList:any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private router: Router, private formBuilder: FormBuilder,
    private forecastMasterService: forecastService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.forecastForm = this.formBuilder.group({

      Date: [""],
      Store_Name: [""],
      Category_Name: [""],
      Subcategory_Name: [''],
      Product_Name: [''],
      SKU_ID: [''],
    });
    this.getStoresNamesList();
    this.getProductNamesList();
    this.getCategoryList();
    let checkbox1 = document.getElementById("inlineRadio1") as HTMLInputElement;
    let checkbox2 = document.getElementById("inlineRadio2") as HTMLInputElement;
    let checkbox3 = document.getElementById("inlineRadio3") as HTMLInputElement;
    if (localStorage.getItem("P10") && localStorage.getItem("P10") == "true") {
      checkbox1.checked = true;
      checkbox2.checked = false;
      checkbox3.checked = false;
    }
    if (localStorage.getItem("P50") && localStorage.getItem("P50") == "true") {
      checkbox1.checked = false;
      checkbox2.checked = true;
      checkbox3.checked = false;
    }
    if (localStorage.getItem("P90") && localStorage.getItem("P90") == "true") {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = true;
    }
  }
  backButtonClick() {
    this.router.navigate(['configurations']);
  }
  getStoresNamesList() {
    this.forecastMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.storeNameList = response;
    });

  }
  getCategoryList() {
    this.forecastMasterService.getCategory().subscribe((response) => {
      console.log(response);
      this.categorysList = response;
      this.getSubCategorysList();
    })
  }
  getSubCategorysList() {
    //debugger;
    console.log(this.forecastForm.value)
    let sub = {
      "prod_cat": this.forecastForm.value.Category_Name,
    }
    this.forecastMasterService.getSubCategory(sub).subscribe((response) => {
      console.log(response);
      this.subCategorysValues = response
    })
  }
  getProductNamesList() {
    this.forecastMasterService.getProductList().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    });
  }

  onclear(){
    this.forecastForm = this.formBuilder.group({

      Date: [""],
      Store_Name: [""],
      Category_Name: [""],
      Subcategory_Name: [''],
      Product_Name: [''],
      SKU_ID: [''],
    });
  }

  onforecastMasterClick() {
    let obj = {

      "Date": this.forecastForm.value.Date,
      "store_name": this.forecastForm.value.Store_Name,
      "prod_cat": this.forecastForm.value.Category_Name,
      "prod_subcat": this.forecastForm.value.Subcategory_Name,
      "sku_id": this.forecastForm.value.SKU_ID,
      "prod_name": this.forecastForm.value.Product_Name,

    }
    this.forecastMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      for (let resp of response[0]) {
        resp.Time_Key = this.datepipe.transform(resp.Time_Key, 'yyyy-MM-dd hh:mm:ss');
      }
      this.forecastMasterData = new MatTableDataSource(response[0]);
      this.forecastMasterData.paginator = this.paginator;
      this.forecastMasterData.sort = this.sort;
    })
  }

  onPClick(value: any) {
    if (value == 'P10') {
      this.isPTenValue = true;
      this.isPFiftyValue = false;
      this.isPNintyValue = false;
      localStorage.setItem("isPTenValue", "true");
      localStorage.setItem("isPFiftyValue", "false");
      localStorage.setItem("isPNintyValue", "false");
    } else if (value == 'P50') {
      this.isPTenValue = false;
      this.isPFiftyValue = true;
      this.isPNintyValue = false;
      localStorage.setItem("isPTenValue", "false");
      localStorage.setItem("isPFiftyValue", "true");
      localStorage.setItem("isPNintyValue", "false");
    } else if (value == 'P90') {
      this.isPTenValue = false;
      this.isPFiftyValue = false;
      this.isPNintyValue = true;
      localStorage.setItem("isPTenValue", "false");
      localStorage.setItem("isPFiftyValue", "false");
      localStorage.setItem("isPNintyValue", "true");
    }
  }

  onPValuesClick(value: any) {
    if (value == 'P10') {
      localStorage.setItem("P10", "true");
      localStorage.setItem("P50", "false");
      localStorage.setItem("P90", "false");
    }
    if (value == 'P50') {
      localStorage.setItem("P10", "false");
      localStorage.setItem("P50", "true");
      localStorage.setItem("P90", "false");
    }
    if (value == 'P90') {
      localStorage.setItem("P10", "false");
      localStorage.setItem("P50", "false");
      localStorage.setItem("P90", "true");
    }
  }
}
