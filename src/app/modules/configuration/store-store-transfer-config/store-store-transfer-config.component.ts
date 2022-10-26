import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreToStoreTransferConfigService } from './store-store-transfer-config.service';

@Component({
  selector: 'app-store-store-transfer-config',
  templateUrl: './store-store-transfer-config.component.html',
  styleUrls: ['./store-store-transfer-config.component.css']
})
export class StoreStoreTransferConfigComponent implements OnInit {
  storeTransferForm!: FormGroup;
  DcToStoreTransferForm!: FormGroup;

  displayColumns: string[] = ['destn_store_id', 'store_name', 'dist_to_destn', 'src_type', 'src_id','tfr_avail', 'Actions']
  displayColuumsDCStore:string[] = ['dc_id', 'dc_name' , 'store_name', 'dist_to_destn', 'src_type', "src_id",'tfr_avail', 'Actions'  ]
  
  storeTransferData!: MatTableDataSource<any>;
  DcToStoretransfterData!: MatTableDataSource<any>;

  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  isChecked = true;
  
  constructor(private storeToStoreTransferService: StoreToStoreTransferConfigService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.getStoreTransferData();
    this.storeTransferForm = this.formBuilder.group({
      storeID: [""],
      storeName: [""],
      distance: [''],
    });

    this.DcToStoreTransferForm = this.formBuilder.group({
      dcID:[""],
      dcName:[""],
      dcDistance : [""],
    })
  }

  onStoreTransferSubmit() {
    let obj = {
      "store_name": this.storeTransferForm.value.storeName,
      "store_id": this.storeTransferForm.value.storeID,
      "dist_to_destn": this.storeTransferForm.value.distance
    }
    this.storeToStoreTransferService.getStoreTransferData(obj).subscribe((response => {
      // for (let store of response) {
      //   store.Edit = false;
      // }
      this.storeTransferData = new MatTableDataSource(response[0]);
      this.storeTransferData.paginator = this.paginator;
      this.storeTransferData.sort = this.sort;
    }))
  }

  onclear(){
    this.storeTransferForm = this.formBuilder.group({
      storeID: [""],
      storeName: [""],
      distance: [''],
    });

    this.DcToStoreTransferForm = this.formBuilder.group({
      dcID:[""],
      dcName:[""],
      dcDistance : [""],
    })
  }

  onDcToStoreSubmit() {
    let object = {
      "dc_name":this.DcToStoreTransferForm.value.dcName,
      "dc_id":this.DcToStoreTransferForm.value.dcID,
      "dist_to_destn":this.DcToStoreTransferForm.value.dcDistance,
    }
    this.storeToStoreTransferService.DcToStoreTransfer(object).subscribe((response => {
      this.DcToStoretransfterData = new MatTableDataSource(response[0]);
      this.DcToStoretransfterData.paginator = this.paginator;
      this.DcToStoretransfterData.sort = this.sort;
    }))

  }
  OnStoreEdit(store: any) {
    console.log(store);
    store.Edit = true;
  }

  OnStoreSave(store: any) {
    console.log(store);
  }

  onChange(el: any, event: any) {
    console.log(el);
    console.log(event.checked); 
    if (event.checked) {
      el.tfr_avail = 1;      
    }
    else{
      el.tfr_avail=0;     
    }    
  }

  onDCChange(el: any, event: any) {
    console.log(el);
    console.log(event.checked); 
    if (event.checked) {
      el.tfr_avail = 1;      
    }
    else{
      el.tfr_avail=0;     
    }    
  }

  onActive(el: any, event: any) {
    console.log(el);
    console.log(event.checked);
    let obj: any;
    if (event.checked) {
      obj = {
        "id": el.id,
        "Distance": el.Distance,
        "Store_Store_Transferd_Config": 1
      }
    } else {
      obj = {
        "id": el.id,
        "Distance": el.Distance,
        "Store_Store_Transferd_Config": 0
      }
    }
    this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.onStoreTransferSubmit();
    }))
  }

  onDistanceChange(element: any, event: any) {
    console.log(element.Distance);
    console.log(event.target.value);
    element.Distance = event.target.value;
  }

  onDCSave(e1: any){
    let obj={
    "src_id":e1.src_id,
    "destn_store_id":e1.destn_store_id,
    "tfr_avail": e1.tfr_avail
    }
    this.storeToStoreTransferService.DCsaveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.onDcToStoreSubmit();
    }))
  }
  onSave(e1: any){
    let obj={
    "src_id":e1.src_id,
    "destn_store_id":e1.destn_store_id,
    "tfr_avail": e1.tfr_avail
    }
    this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
      console.log(response);
      this.onStoreTransferSubmit();
    }))
  }

  // onSave(el: any){
  //   let obj = {
  //     "id": el.id,
  //     "Distance": el.Distance,
  //     "Store_Store_Transferd_Config": el.Store_Store_Transferd_Config
  //   }
  //   this.storeToStoreTransferService.saveStoreTransfer(obj).subscribe((response => {
  //     console.log(response);
  //     this.onStoreTransferSubmit();
  //   }))
  // }
}

