import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { ProductMasterService } from './product-master.service';

export interface User {
  prod_name: string;
}

export interface Category {
  prod_cat: string;
}


@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
  
})
export class ProductMasterComponent implements OnInit {
  productdata!: MatTableDataSource<any>;
  displayColumns: string[] = ['prod_name', 'sku_id', 'prod_cat', 'prod_subcat', 'pkg_units', 'Actions'];
  pageSize = 10;
  //productNameList: any;
  // categoryList: any;
  subCategoryValues: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  productMasterForm!: FormGroup;
  ProductName : string = '';  


  productName = new FormControl<string | User>('');
  options: User[] = [];
  productNameList: any;
  productnamefield:any;

  productCategories = new FormControl<string | Category>('');
  categoryoptions: Category[] = [];
  categoryList: any;
  categorynamefield:any;

  autovalueProduct:any;
  autovalueCategory:any;


  constructor(
    private router: Router,
    private productMasterService: ProductMasterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {     
    this.productNameList = this.productName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_name = typeof value === 'string' ? value : value?.prod_name;
        return prod_name ? this._filter(prod_name as string) : this.options.slice();
      }),
    );   

    this.categoryList = this.productCategories.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_cat = typeof value === 'string' ? value : value?.prod_cat;
        return prod_cat ? this._filterCategory(prod_cat as string) : this.categoryoptions.slice();
      }),
    );   
    
    this.productMasterForm = this.formBuilder.group({
      productName: [""],
      productCategories: [""],
      SKUCode: [''],
      productStatus: ['']
    });
    this.getProductNameList();
    this.getCategoryList();
    
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }  

   getProductNameList() {
    this.productMasterService.getProductList().subscribe((response) => {
      console.log(response);
      this.options = response;
    });
  }

  getCategoryList() {
    this.productMasterService.getCategory().subscribe((response) => {
      console.log(response);
      this.categoryoptions = response;
      
    })
  }
  onclear(){
    console.log(this.productMasterForm.value.productCategories);
    console.log(this.productMasterForm);
    this.productMasterForm = this.formBuilder.group({
      productName: [""],
      productCategories: [""],
      SKUCode: [''],
      productStatus: ['']
    });
    this.productnamefield = '';
    this.categorynamefield= '';
    this.autovalueProduct = "";
    this.autovalueCategory = "";
    console.log(this.productMasterForm);
  }

  private _filter(prod_name: string): User[] {
    const filterValue = prod_name.toLowerCase();
    this.autovalueProduct= filterValue;
    console.log(filterValue);
    return this.options.filter(products => products.prod_name.toLowerCase().includes(filterValue));
  }

  private _filterCategory(prod_cat: string): Category[] {
    const filterValue = prod_cat.toLowerCase();
    this.autovalueCategory=filterValue;
    //console.log(filterValue);
    return this.categoryoptions.filter(category => category.prod_cat.toLowerCase().includes(filterValue));
  }

  onProductMasterSubmit(){
     this.ProductMaster();
  }

  onChangeSkuId(event: Event){
    console.log((event.target as HTMLInputElement)?.value);
    this.fechingDataSkuId((event.target as HTMLInputElement)?.value);
  }

  onChangeProductName(productname:any){
    console.log("store"+productname.option.value);
    this.fechingDataProductName(productname.option.value);
  }
  
  fechingDataSkuId(value:any){ 
   
    let  obj = {    
       "category":"",
       "subcategory":"",
       "skuid":value,
       "product":""
    }
  console.log(obj);
  this.productMasterService.getItemFilter(obj).subscribe((response) => {
    console.log(response);
    this.fechingItemLunchInfo(response.data[0]);
    this.productdata = new MatTableDataSource(response[0]);
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
 this.productMasterService.getItemFilter(obj).subscribe((response) => {
  console.log(response);
  this.fechingItemLunchInfo(response.data[0]);
  this.productdata = new MatTableDataSource(response[0]);
  // this.storeData.paginator = this.paginator;
  // this.storeData.sort = this.sort;
 })  
 
 }

  ProductMaster() {
    let data = {}
    if (this.autovalueProduct == undefined && this.autovalueCategory == undefined) {
      data = {       
      "prod_name": this.productMasterForm.value.productName,
      "prod_cat": this.productMasterForm.value.productCategories,
      //"Status": this.productMasterForm.value.productStatus,
      "sku_id": this.productMasterForm.value.SKUCode,
      }
    }else if(this.autovalueCategory == undefined){
      data = {       
        "prod_name": this.autovalueProduct,
        "prod_cat": this.productMasterForm.value.productCategories,
        //"Status": this.productMasterForm.value.productStatus,
        "sku_id": this.productMasterForm.value.SKUCode,
        }
    }else if(this.autovalueProduct == undefined){
      data = {       
        "prod_name": this.productMasterForm.value.productName,
        "prod_cat": this.autovalueCategory,
        //"Status": this.productMasterForm.value.productStatus,
        "sku_id": this.productMasterForm.value.SKUCode,
        }
    }
    else{
      data = {      
        "prod_name": this.autovalueProduct,
        "prod_cat": this.autovalueCategory,
        //"Status": this.productMasterForm.value.productStatus,
        "sku_id": this.productMasterForm.value.SKUCode,
      }      
    }   
    console.log(data);
    this.productMasterService.getproductMasterData(data).subscribe((response) => {
      console.log(response);
      this.productdata = new MatTableDataSource(response[0]);
      this.productdata.paginator = this.paginator;
      this.productdata.sort = this.sort;
    })
  }
  onProdEdit(element: any) { }

  onProdSave(element: any) { }

  fechingItemLunchInfo(val:any){

    this.productMasterForm = this.formBuilder.group({
      
      SKUCode: val.sku_id,
      
    });
   
  
    this.productnamefield = val.prod_name;
    this.categorynamefield=val.prod_cat;
   
  }
}



