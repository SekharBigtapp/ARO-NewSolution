import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { category } from '../../master-data/store-supplier-master/store-supplier-master.component';
import { NewLaunchItemService } from './new-item-launch.service';

export interface User {
  prod_name: string;
}
export interface Category {
  prod_cat: string;
}
export interface SubCategory {
  prod_subcat: string;
}


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
  //categoryNameList:any;
  //productNameList:any;
 //subCategoryNameList:any;

  ProductName = new FormControl<string | User>('');
  options: User[] = [];
  productNameList: any;
  productnameField:any;
  autoFilterProduct:any;

  CategoryName = new FormControl<string | Category>('');
  Categoryoptions: Category[] = [];
  categoryNameList: any;

  SubcategoryName = new FormControl<string | SubCategory>('');
  SubCategoryoptions: SubCategory[] = [];
  subCategoryNameList: any;

  autoFilterCategory:any;
  categoryNameField:any;
  autoFilterSubCat:any;
  subcategoryNameField:any;



  constructor(
    private router: Router,
    private newLaunchService: NewLaunchItemService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productNameList = this.ProductName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_name = typeof value === 'string' ? value : value?.prod_name;
        return prod_name ? this._filter(prod_name as string) : this.options.slice();
      }),
    );
    this.categoryNameList = this.CategoryName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_cat = typeof value === 'string' ? value : value?.prod_cat;
        return prod_cat ? this._filterCategory(prod_cat as string) : this.Categoryoptions.slice();
      }),
    );
    this.subCategoryNameList = this.SubcategoryName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_subcat = typeof value === 'string' ? value : value?.prod_subcat;
        return prod_subcat ? this._filterSubCategory(prod_subcat as string) : this.Categoryoptions.slice();
      }),
    );
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
      this.Categoryoptions = response;
      this.getSubCategorysList();
    })
  }

  private _filter(prod_name: string): User[] {
    const filterValueProduct = prod_name;
    this.autoFilterProduct=filterValueProduct;
    return this.options.filter(product => product.prod_name.toLowerCase().includes(filterValueProduct));
  }
  private _filterCategory(prod_cat: string): Category[] {
    const filterValueCategory = prod_cat;
    this.autoFilterCategory=filterValueCategory;
    return this.Categoryoptions.filter(category => category.prod_cat.toLowerCase().includes(filterValueCategory));
  }

  private _filterSubCategory(prod_subcat: string): SubCategory[] {
    const filterValueSubCategory = prod_subcat;
    this.autoFilterSubCat=filterValueSubCategory;
    return this.SubCategoryoptions.filter(subProduct => subProduct.prod_subcat.toLowerCase().includes(filterValueSubCategory));
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
    this.productnameField = '';
    this.categoryNameField = '';
    this.autoFilterCategory = "";
    this.autoFilterProduct = "";
    this.autoFilterSubCat = "";
    this.subcategoryNameField ='';

    
  }

  getSubCategorysList() {
    //debugger;
    console.log(this.upcomingItemForm.value)
    let sub = {
      "prod_cat": this.autoFilterCategory,
    }
    console.log(this.autoFilterCategory)
    this.newLaunchService.getSubCategoryNames(sub).subscribe((response) => {
      console.log(response);
      this.SubCategoryoptions = response
    })
  }
  getProductNamesList(){
    this.newLaunchService.getProductNames().subscribe((response) => {
      console.log(response);
      this.options = response;
    })
    
  }

  onChangeSkuId(event: Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.fechingDataSkuId((event.target as HTMLInputElement)?.value);
  }

  onChangeProductName(productname:any){
    console.log("store"+productname.option.value);
    this.fechingDataProductName(productname.option.value);
  }

  onChangeCategoryName(categoryname:any){
    console.log("store"+categoryname.option.value);
    this.fechingDataCategoryName(categoryname.option.value);
  }
  onChangeSubCategoryName(subcategoryname:any){
    console.log("store"+subcategoryname.option.value);
    this.fechingDataSubCategoryName(subcategoryname.option.value);

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

  onUpcomingProduSubmit(){
    this.upcomingProduct();
  }

 upcomingProduct() {
  let data = {}
  if (this.autoFilterCategory == undefined && this.autoFilterProduct == undefined){
    data = {
      "product": this.upcomingItemForm.value.productName,
      "prod_cat": this.upcomingItemForm.value.productCategories,
      "prod_subcat": this.upcomingItemForm.value.subCategory,
      "sku_id": this.upcomingItemForm.value.skuCode,
    }
  }else if(this.autoFilterCategory == undefined){
    alert(this.autoFilterProduct);
    data = {
      "product": this.autoFilterProduct,
      "prod_cat": this.upcomingItemForm.value.productCategories,
      "prod_subcat": this.upcomingItemForm.value.subCategory,
      "sku_id": this.upcomingItemForm.value.skuCode,
    }
  }else if(this.autoFilterProduct == undefined){
    alert()
    data = {
      "product": this.upcomingItemForm.value.productName,
      "prod_cat": this.autoFilterCategory,
      "prod_subcat": this.autoFilterSubCat,
      "sku_id": this.upcomingItemForm.value.skuCode,
    }
  }else{
    data = {
      "product": this.autoFilterProduct,
      "prod_cat": this.autoFilterCategory,
      "prod_subcat": this.autoFilterSubCat,
      "sku_id": this.upcomingItemForm.value.skuCode,
    }
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

  fechingDataSkuId(value:any){ 
   
   let  obj = {    
      "category":"",
      "subcategory":"",
      "skuid":value,
      "product":""
   }
 console.log(obj);
 this.newLaunchService.getItemLunchFilter(obj).subscribe((response) => {
   console.log(response);
   this.fechingItemLunchInfo(response.data[0]);
   this.upcomingItemData = new MatTableDataSource(response[0]);
   // this.storeData.paginator = this.paginator;
   // this.storeData.sort = this.sort;
 })  
}

fechingDataProductName(productname:any){
  let  obj = {    
    "category":"",
    "subcategory":"",
    "skuid":"",
    "product":productname
 }

console.log(obj);
this.newLaunchService.getItemLunchFilter(obj).subscribe((response) => {
 console.log(response);
 this.fechingItemLunchInfo(response.data[0]);
 this.upcomingItemData = new MatTableDataSource(response[0]);
 // this.storeData.paginator = this.paginator;
 // this.storeData.sort = this.sort;
})  

}

fechingDataCategoryName(categoryname:any){
  let  obj = {    
    "category":categoryname,
    "subcategory":"",
    "skuid":"",
    "product":""
 }

console.log(obj);
this.newLaunchService.getItemLunchFilter(obj).subscribe((response) => {
 console.log(response);
 this.fechingItemLunchInfo(response.data[0]);
 this.upcomingItemData = new MatTableDataSource(response[0]);
 // this.storeData.paginator = this.paginator;
 // this.storeData.sort = this.sort;
})  
}

fechingDataSubCategoryName(subcategoryname:any){
  let  obj = {    
    "category":"",
    "subcategory":subcategoryname,
    "skuid":"",
    "product":""
 }

console.log(obj);
this.newLaunchService.getItemLunchFilter(obj).subscribe((response) => {
 console.log(response);
 this.fechingItemLunchInfo(response.data[0]);
 this.upcomingItemData = new MatTableDataSource(response[0]);
 // this.storeData.paginator = this.paginator;
 // this.storeData.sort = this.sort;
})  
}

fechingItemLunchInfo(val:any){
  this.upcomingItemForm = this.formBuilder.group({
    
    skuCode: val.sku_id,
  
  });

  this.productnameField = val.prod_name;
  this.categoryNameField=val.prod_cat;
  this.subcategoryNameField = val.prod_subcat;
}

}
