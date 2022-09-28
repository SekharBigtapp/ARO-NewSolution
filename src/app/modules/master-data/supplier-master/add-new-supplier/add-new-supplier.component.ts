import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { supplerMasterService } from '../supplier-master.service';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.css']
})
export class AddNewSupplierComponent implements OnInit {
  addNewSupplierForm!:FormGroup

  validation_messages = {
    Supplier_Key: [
      { type: 'required', message: 'Please Enter Supplier Id' },
    ],
    Supplier_Name: [
      { type: 'required', message: 'Please Enter Supplier Name' },
    ],
    Supplier_Email_ID: [
      { type: 'required', message: 'Please Enter email' },
      { type: 'pattern', message: 'Please enter valid Email ID' },
    ],
    Supplier_Contact_Details: [
      { type: 'required', message: 'Please Enter Contact Details' },
    ],
    
    Country_Name: [
      { type: 'required', message: 'Please Enter Country Name' },
    ],
    Supplier_Region:[
      { type: 'required', message: 'Please Enter Region Name' },
    ],
    City_Name: [
      { type: 'required', message: 'Please Enter City Name' },
    ],
    // Supplier_Latitude: [
    //   { type: 'required', message: 'Please Enter Supplier Latitude' },
    // ],
    // Supplier_Longitude: [
    //   { type: 'required', message: 'Please Enter Supplier Longitude' },
    // ],
    // Status: [
    //   { type: 'required', message: 'Please Select Status' },
    // ],
  };

  constructor(
    private router: Router,
    private supplerMasterService : supplerMasterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addNewSupplierForm = this.formBuilder.group({
      Supplier_Key: ["",Validators.required], 
      Supplier_Name: ["",Validators.required],
      Supplier_Email_ID: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)])],
      Supplier_Contact_Details: ['',Validators.required],
      Supplier_Region: ['',Validators.required],
      Country_Name: ['',Validators.required],
      City_Name: ['',Validators.required],
      relationship_end_dt:[''],
      Green_Score:[''],

      // Status: ['',Validators.required],
    });
  }onNewSupplierSubmit() {
   
    let obj = {
      "supp_id": this.addNewSupplierForm.value.Supplier_Key,
      "supp_name": this.addNewSupplierForm.value.Supplier_Name,
      "supp_email": this.addNewSupplierForm.value.Supplier_Email_ID,
      "supp_phnum": this.addNewSupplierForm.value.Supplier_Contact_Details,
      "supp_region": this.addNewSupplierForm.value.Supplier_Region,
      "supp_cntry": this.addNewSupplierForm.value.Country_Name,
      "supp_city": this.addNewSupplierForm.value.City_Name,
      // "Status": this.addNewSupplierForm.value.Status,
      "relationship_end_dt" : this.addNewSupplierForm.value.relationship_end_dt,
      "Green_Score" : this.addNewSupplierForm.value.Supplier_Longitude,   
    }
    this.supplerMasterService.addNewSupplierData(obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/suppliermaster')
     
    })
  }

}
