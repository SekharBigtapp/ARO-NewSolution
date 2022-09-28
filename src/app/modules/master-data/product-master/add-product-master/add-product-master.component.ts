import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductMasterService } from '../product-master.service';

@Component({
  selector: 'app-add-product-master',
  templateUrl: './add-product-master.component.html',
  styleUrls: ['./add-product-master.component.css']
})
export class AddProductMasterComponent implements OnInit {
  addproductMasterForm!: FormGroup;
  
  validation_messages = {
    SKU_ID: [
      { type: 'required', message: 'Please Enter SKU ID' },
    ],
    Product_Name: [
      { type: 'required', message: 'Please Enter Product_Name' },
    ],
    Category_Name: [
      { type: 'required', message: 'Please Enter Category Name' },
    ],
    Subcategory_Name: [
      { type: 'required', message: 'Please Enter Sub Category Name' },
    ],
    Package_Size: [
      { type: 'required', message: 'Please Enter Pack Size' },
    ],
    NewProduct: [
      { type: 'required', message: 'Please Select NewProduct' },
    ],
    ABCClarification: [
      {type: 'required', message: "Please Select ABCClarification"},
    ],
    ArticleId: [
      {type: 'required', message: "Please Enter Article Id"},
    ],
    
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productMasterService: ProductMasterService
  ) { }
 
  ngOnInit(): void {
    this.addproductMasterForm = this.formBuilder.group({
      Product_Name: ["", Validators.required],
      Category_Name: ["", Validators.required],
      Subcategory_Name: ["", Validators.required],
      Product_Description: [""],
      SKU_ID: ["", Validators.required],
      Brand_Description: [""],
      Storage_Type: [""],
      Package_Size: ["", Validators.required],
      Dimensions: [""],
      weight: [""],
      lunchDate: [""],
      Color: [""],
      ABCClarification: ["", Validators.required],
      ArticleId:["",Validators.required],
    });
  }

  onAddProductMasterSubmit() {
    alert();    
    let Obj = {
      "SKU_ID": this.addproductMasterForm.value.SKU_ID,
      "Product_Name": this.addproductMasterForm.value.Product_Name,
      "Category": this.addproductMasterForm.value.Category_Name,
      "SubCategory": this.addproductMasterForm.value.Subcategory_Name,
      "Product_Description":this.addproductMasterForm.value.Product_Description,      
      "Brand":this.addproductMasterForm.value.Brand_Description,
      "Storage_requirement": this.addproductMasterForm.value.Storage_Type,
      "Pack_size": this.addproductMasterForm.value.Package_Size,
      "Dimension": this.addproductMasterForm.value.Dimensions,
      "weight": this.addproductMasterForm.value.weight,
      "launch_date": this.addproductMasterForm.value.lunchDate,
      "color": this.addproductMasterForm.value.Color,
      "ABC_Classification": this.addproductMasterForm.value.ABCClarification,
      "article_id": this.addproductMasterForm.value.ArticleId
     
    }
    this.productMasterService.addNewproductMasterData(Obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/productmaster')
    })

  }
}
