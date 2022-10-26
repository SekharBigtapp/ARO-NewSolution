import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewLaunchItemService } from './new-item-launch.service';

@Component({
  selector: 'app-new-item-launch-date',
  templateUrl: './new-item-launch-date.component.html',
  styleUrls: ['./new-item-launch-date.component.css']
})
export class NewItemLaunchDateComponent implements OnInit {

  upcomingItemData!: MatTableDataSource<any>;
  displayColumns: string[] = ['sku_id', 'prod_name', 'prod_cat', 'prod_subcat', 'most_similar_prods', 'likelihood_scores', 'Actions'];
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) dataPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) dataSort!: MatSort;
  upcomingItemForm!: FormGroup;
  selecteditem = ''
  categoryNameList:any;
  productNameList:any;
  subCategoryNameList:any;

  constructor(
    private router: Router,
    private newLaunchService: NewLaunchItemService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.upcomingItemForm = this.formBuilder.group({
      storeName: [""],
      CategoryName: [''],
      SubcategoryName: [''],
      ProductName:[''],
      skuCode: [''],
      Store_Name: [''],
    });
    
    this.getProductNamesList();
    this.getCategoryList(); 
  }
  backButtonClick() {
    this.router.navigate(['transaction']);
  }

  

  getCategoryList() {
    this.newLaunchService.getCategoryNames().subscribe((response) => {
      console.log(response);
      this.categoryNameList = response;
      this.getSubCategorysList();
    })
  }
  onClear(){
    this.upcomingItemForm = this.formBuilder.group({
      storeName: [""],
      CategoryName: [''],
      SubcategoryName: [''],
      ProductName:[''],
      skuCode: [''],
      Store_Name: [''],
    });
    
  }

  getSubCategorysList() {
    //debugger;
    console.log(this.upcomingItemForm.value)
    let sub = {
      "prod_cat": this.upcomingItemForm.value.CategoryName,
    }
    this.newLaunchService.getSubCategoryNames(sub).subscribe((response) => {
      console.log(response);
      this.subCategoryNameList = response
    })
  }
  getProductNamesList(){
    this.newLaunchService.getProductNames().subscribe((response) => {
      console.log(response);
      this.productNameList = response;
    })
    
  }

  similarProduct(element: any, selectedOption: any) {
    console.log(selectedOption.target.value);
    let likelihoodList = element.likelihood_scores;
  //   for(let i=0;i<likelihoodList.length;i++){
  //     if (selectedOption.target.value == likelihoodList[i].id) {
  //       console.log(selectedOption,likelihoodList[i].likelihood_score)
  //           element.likelihoodValue = likelihoodList[i].likelihood_score;
  //         }
  // }

    for (let scr of likelihoodList)
      if (selectedOption.target.value == scr.id) {
        element.likelihoodValue = scr.likelihood_score;
      }
  }

  onUpcomingProduSubmit() {
    let data = {
      "product": this.upcomingItemForm.value.productName,
      "prod_cat": this.upcomingItemForm.value.productCategories,
      "prod_subcat": this.upcomingItemForm.value.subCategory,
      "sku_id": this.upcomingItemForm.value.skuCode,


    }
    this.newLaunchService.getNewItemLauchData(data).subscribe((response) => {
      console.log(response);
      for (let d of response.data) {
        d.likelihoodValue = "";
      }
      let data = response.data;
      this.upcomingItemData = new MatTableDataSource(data);
      this.upcomingItemData.paginator = this.dataPaginator;
      this.upcomingItemData.sort = this.dataSort;
    })
  }
}
