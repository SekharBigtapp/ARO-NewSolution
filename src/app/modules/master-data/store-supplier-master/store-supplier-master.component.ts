import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { Stores } from '../../process/stores';
import { storesupplierMasterservice } from './store-supplier-master.service';

export interface Store {
  store_name: string; 
}
export interface Product {
  prod_name: string; 
}
export interface category {
  prod_cat: string;  
}


@Component({
  selector: 'app-store-supplier-master',
  templateUrl: './store-supplier-master.component.html',
  styleUrls: ['./store-supplier-master.component.css']
})
export class StoreSupplierMasterComponent implements OnInit {
  storesupplierMasterform!: FormGroup;
  displayColumns: string[] = ['prod_name', 'sku_id', 'prod_cat', 'prod_subcat', 'store_id', 'store_name','supp_id', 'supp_name', 'supp_city', 'Actions']
  storesupplierMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  // storeNameList: any;
  // productNameList: any;
  // categoryList: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
   
  storename = new FormControl<string | Store>('');
  Storeoptions: Store[] =[];
  storeNameList: any;

  productname = new FormControl<string | Product>('');
  ProductOptions: Product[] = [];
  productNameList: any;

  categoryname = new FormControl<string | category>('');
  categoryOption: category[] = [];
  
  categoryList: any;
  productnamefield: any;
  storenamefield:any;
  categorynamefield:any;

  productvalue:any;
  storevalue:any;
  categoryvalue:any;

   dataValues:any = {"supp_name":String,"supp_id":String,"prod_name":String,"prod_cat":String,"store":String};

  constructor(
    private router: Router,private formBuilder: FormBuilder, private storesupplierMasterService: storesupplierMasterservice
  ) { 
    
  }

  ngOnInit(): void {
    
      this.storeNameList = this.storename.valueChanges.pipe(
      startWith(''),
      map(value => {
        const store_name = typeof value === 'string' ? value : value?.store_name;
        return store_name ? this._filterstore(store_name as string) : this.Storeoptions.slice();
      }),
    );
    this.productNameList = this.productname.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_name = typeof value === 'string' ? value : value?.prod_name;
        return prod_name ? this._filterproduct(prod_name as string) : this.ProductOptions.slice();
      }),
    );
    this.categoryList = this.categoryname.valueChanges.pipe(
      startWith(''),
      map(value => {
        const prod_cat = typeof value === 'string' ? value : value?.prod_cat;
        return prod_cat ? this._filtercategory(prod_cat as string) : this.categoryOption.slice();
      }),
    );
    this.storesupplierMasterform = this.formBuilder.group({
      storename: new FormControl(),
      productname: [""],
      categoryname: [""],
      supplierID: [''],
      supplierName: [''],      
    });  
    this.getStoresNamesList();
    this.getProductNameList();
    this.getCategoryList();    
  }
  backButtonClick(){
    this.router.navigate(['masters']);
  } 

  private _filterstore(store_name: string): Store[] {
    const filterValue = store_name;
    this.storevalue=filterValue;
    console.log(this.storevalue)
    return this.Storeoptions.filter(store => store.store_name.includes(filterValue));
  }

  private _filterproduct(prod_name: string): Product[] {
    const filterValue1 = prod_name;
    this.productvalue=filterValue1;
    console.log(this.productvalue);
    return this.ProductOptions.filter(products => products.prod_name.includes(filterValue1));
  }

  private _filtercategory(prod_cat: string): category[] {
    const filterValue2 = prod_cat;
    this.categoryvalue=filterValue2;
    console.log(this.categoryvalue);
    return this.categoryOption.filter(category => category.prod_cat.includes(filterValue2));
  }

  onclear(){
    this.storesupplierMasterform = this.formBuilder.group({
      storename: [""],
      productname: [""],
      categoryname: [""],
      supplierID: [''],
      supplierName: [''],
      
    });
    this.productnamefield = '';
    this.storenamefield = '';
    this.categorynamefield = '';
    this.productvalue = "";
    this.storevalue = "";
    this.categoryvalue = "";
  }

  getProductNameList() {
    this.storesupplierMasterService.getProductList().subscribe((response) => {
      console.log(response);
      this.ProductOptions = response;
    });
  }

  getCategoryList() {
    this.storesupplierMasterService.getCategory().subscribe((response) => {
      console.log(response);
      this.categoryOption = response;
      
    })
  }

  getStoresNamesList() {
    this.storesupplierMasterService.getStoreNames().subscribe((response) => {
      console.log(response);
      this.Storeoptions = response;
      
    });

  }

  onStoreSupplierMasterSubmit(){
    this.SupplierMaster();
  }

  SupplierMaster() {

    
      if (this.productvalue == undefined && this.storevalue == undefined && this.categoryvalue == undefined){
 
      this.dataValues.prod_name=this.storesupplierMasterform.value.productname
      this.dataValues.prod_cat= this.storesupplierMasterform.value.categoryname;
      this.dataValues.store=this.storesupplierMasterform.value.storename;
    }    
    else if(this.productvalue == undefined && this.storevalue == undefined){
           
      this.dataValues.store=this.categoryvalue;
    } 
    else if(this.storevalue == undefined && this.categoryvalue == undefined){
      this.dataValues.prod_name=this.productvalue;    
    } 
    else if(this.productvalue == undefined && this.categoryvalue == undefined){
      this.dataValues.store=this.storevalue;
    }
    else if(this.categoryvalue == undefined){
      alert(this.categoryvalue);
      this.dataValues.prod_name=this.productvalue;    
      this.dataValues.store=this.storevalue;
    }
    else if(this.storevalue == undefined){
      alert(this.storevalue + ""+this.productvalue);
      alert(this.storevalue + "" + this.categoryvalue);     
      this.dataValues.prod_name=this.productvalue;
      this.dataValues.prod_cat= this.categoryvalue;
    }
    else if(this.productvalue == undefined){      
      this.dataValues.prod_cat= this.categoryvalue;
      this.dataValues.store=this.storevalue;   
   }    
    else{
      this.dataValues.prod_name=this.productvalue;    
      this.dataValues.store=this.storevalue;
      this.dataValues.prod_cat= this.categoryvalue;
    }  
   
    this.storesupplierMasterService.getStores(this.dataValues).subscribe((response) => {
      console.log(response);
      this.storesupplierMasterData = new MatTableDataSource(response.data);
      this.storesupplierMasterData.paginator = this.paginator;
      this.storesupplierMasterData.sort = this.sort;
    })
  }
}

