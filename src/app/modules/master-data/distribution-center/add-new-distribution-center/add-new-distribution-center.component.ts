import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distributionCenterService } from '../distribution-center.service';


@Component({
  selector: 'app-add-new-distribution-center',
  templateUrl: './add-new-distribution-center.component.html',
  styleUrls: ['./add-new-distribution-center.component.css']
})
export class AddNewDistributionCenterComponent implements OnInit {

  addDCmasterForm!: FormGroup;

  validation_messages = {
    Distribution_Key: [
      { type: 'required', message: 'Please Enter Dc Id' },
    ],
    Distribution_Name: [
      { type: 'required', message: 'Please Enter Dc Name' },
    ],
    State_Name: [
      { type: 'required', message: 'Please Enter Dc City' },
    ],
    Country_Name: [
      { type: 'required', message: 'Please Enter Dc State' },
    ],
    City_Name: [
      { type: 'required', message: 'Please Enter Dc Country' },
    ],
    Latitude: [
      { type: 'required', message: 'Please Enter Dc Lattitude' },
    ],
    Longitude: [
      { type: 'required', message: 'Please Enter Dc Longitude' },
    ],
    Distribution_Code: [
      { type: 'required', message: 'Please Enter Distribution Code' },
    ],
    // Status: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    // Store_Key: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    // Distance: [
    //   { type: 'required', message: 'Please Enter Status' },
    // ],
    
    
    
  };

  constructor(private router: Router, private formBuilder:FormBuilder, private distributionCenterService:distributionCenterService  ){ }

  ngOnInit(): void {
    this.addDCmasterForm= this.formBuilder.group({
      Distribution_Key: ['',Validators.required],
      Distribution_Name: ['',Validators.required],
      State_Name: ['',Validators.required],
      Country_Name: ['',Validators.required],
      City_Name: ['',Validators.required],
      Latitude: ['',Validators.required],
      Longitude: ['',Validators.required],
      Distribution_Code:['',Validators.required],
      // Status: ['',Validators.required],
      // Store_Key:['',Validators.required],
      // Distance:['',Validators.required]
    })
  }

  onAddDCMasterSubmit(){
   
    console.log(this.addDCmasterForm.value);
    let obj = {
      "dc_id":this.addDCmasterForm.value.Distribution_Key,
      "dc_name": this.addDCmasterForm.value.Distribution_Name,
      "dc_region": this.addDCmasterForm.value.State_Name,
      "dc_cntry": this.addDCmasterForm.value.Country_Name,
      "dc_city": this.addDCmasterForm.value.City_Name,
      "dc_long": this.addDCmasterForm.value.Latitude,
      "dc_lat": this.addDCmasterForm.value.Longitude,
      "dc_code": this.addDCmasterForm.value.Distribution_Code,
      // "Status": this.addDCmasterForm.value.Status,
      // "Store_Key": this.addDCmasterForm.value.Store_Key,
      // "Distance" : this.addDCmasterForm.value.Distance,
      
    }
    this.distributionCenterService.addNewDistribution(obj).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/distributionmaster')
     
    })

  }
}
