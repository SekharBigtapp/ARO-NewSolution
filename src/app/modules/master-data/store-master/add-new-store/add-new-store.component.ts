import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { storeMasterService } from '../store-master.service';

@Component({
  selector: 'app-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.css']
})
export class AddNewStoreComponent implements OnInit {
  addstoreMasterform!: FormGroup; 
  validation_messages = {
    Store_Key: [
      { type: 'required', message: 'Please Enter Store Id' },
    ],
    Store_Name: [
      { type: 'required', message: 'Please Enter Store Name' },
    ],
    Store_City: [
      { type: 'required', message: 'Please Enter Store City' },
    ],
    Store_State: [
      { type: 'required', message: 'Please Enter Store State' },
    ],
    Store_Country: [
      { type: 'required', message: 'Please Enter Store Country' },
    ],
    Store_Lattitude: [
      { type: 'required', message: 'Please Enter Store Lattitude' },
    ],
    Store_Longitude: [
      { type: 'required', message: 'Please Enter Store Longitude' },
    ],
    Status: [
      { type: 'required', message: 'Please Enter Status' },
    ],
    
    
  };
  
 
  constructor(
    private router: Router, private formBuilder: FormBuilder, private storeMasterService: storeMasterService
  ) { }

  ngOnInit(): void {
    this.addstoreMasterform = this.formBuilder.group({
      Store_Key: ['',Validators.required],
      Store_Name: ['',Validators.required],
      Store_City: ['',Validators.required],
      Store_State: ['',Validators.required],
      Store_Country: ['',Validators.required],
      Store_Lattitude: ['',Validators.required],
      Store_Longitude: ['',Validators.required],
      store_manager:[''],
      manager_email:[''],
      store_type:[''],
      store_sqft:[''],
      catchment_area:[''],
      affluency_rtng:[''],
     
    });
  }
 
  onAddStoreMasterSubmit() {
    let obj = {
      "store_id":this.addstoreMasterform.value.Store_Key,
      "store_name":this.addstoreMasterform.value.Store_Name,
      "store_city":this.addstoreMasterform.value.Store_City,
      "store_region":this.addstoreMasterform.value.Store_State,
      "store_cntry":this.addstoreMasterform.value.Store_Country,
      "store_lat":this.addstoreMasterform.value.Store_Lattitude,
      "store_long":this.addstoreMasterform.value.Store_Longitude,
      "store_manager":this.addstoreMasterform.value.store_manager,
      "manager_email":this.addstoreMasterform.value.manager_email ,
      "store_type":this.addstoreMasterform.value.store_type,
      "store_sqft":this.addstoreMasterform.value.store_sqft,
      "catchment_area":this.addstoreMasterform.value.catchment_area,
       "affluency_rtng":this.addstoreMasterform.value.affluency_rtng,

      // "Status":this.addstoreMasterform.value.Status
    }
    this.storeMasterService.addnewStores(obj).subscribe((response) => {
      console.log(response);
     
      this.router.navigateByUrl('/storemaster');

    })
  }

}
