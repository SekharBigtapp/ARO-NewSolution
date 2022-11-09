import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    alert('hi');
  }
  productMasterClick() {
    alert('hi');
    this.router.navigate(['masters/productmaster']);
  }
  storeMasterClick() {
    this.router.navigate(['masters/storemaster']);
  }

  distributionMasterClick() {
    this.router.navigate(['masters/distributionmaster']);
  }
  supplierMasterClick() {
    this.router.navigate(['masters/suppliermaster']);
  }
  storeSupplierMasterClick() {
    this.router.navigate(['masters/storesupplymaster']);
  }
}
