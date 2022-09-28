import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { supplerMasterService } from './supplier-master.service';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})
export class SupplierMasterComponent implements OnInit {
  supplierMasterform!: FormGroup;
  displayColumns: string[] = ['supp_id', 'supp_name', 'supp_cntry', 'supp_region', 'supp_city', 'supp_email', 'supp_phnum', 'Actions']
  supplierMasterData!: MatTableDataSource<any>;
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    private router: Router, private formBuilder: FormBuilder, private supplierMasterService: supplerMasterService
  ) { }

  ngOnInit(): void {
    this.supplierMasterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      supplierID: [''],
      supplierName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onSupplierMasterSubmit() {
    let obj = {
      "supp_cntry": this.supplierMasterform.value.country,
      "supp_region": this.supplierMasterform.value.state,
      "supp_city": this.supplierMasterform.value.city,
      "supp_id": this.supplierMasterform.value.supplierID,
      "supp_name": this.supplierMasterform.value.supplierName
    }
    this.supplierMasterService.getStores(obj).subscribe((response) => {
      console.log(response);
      this.supplierMasterData = new MatTableDataSource(response[0]);
      this.supplierMasterData.paginator = this.paginator;
      this.supplierMasterData.sort = this.sort;
    })
  }
}
