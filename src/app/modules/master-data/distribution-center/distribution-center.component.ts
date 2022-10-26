import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { distributionCenterService } from './distribution-center.service';

@Component({
  selector: 'app-distribution-center',
  templateUrl: './distribution-center.component.html',
  styleUrls: ['./distribution-center.component.css']
})
export class DistributionCenterComponent implements OnInit {
  distributionCenterform!: FormGroup;
  displayColumns: string[] = ['dc_id', 'dc_name', 'dc_cntry', 'dc_region', 'dc_city', 'dc_long', 'dc_lat', 'Actions'];
  pageSize = 10;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  distributionCenterData!: MatTableDataSource<any>;

  constructor(
    private router: Router, private formBuilder: FormBuilder, private distributinoCenterService: distributionCenterService
  ) { }

  ngOnInit(): void {
    this.distributionCenterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      distributionCenterID: [''],
      distributionCentralName: ['']
    });
  }
  backButtonClick() {
    this.router.navigate(['masters']);
  }

  onClear(){
    this.distributionCenterform = this.formBuilder.group({
      country: [""],
      state: [""],
      city: [''],
      distributionCenterID: [''],
      distributionCentralName: ['']
    });
  }

  onDistributionCenterSubmit() {
    console.log(this.distributionCenterform.value);
    let obj = {
      "dc_cntry": this.distributionCenterform.value.country,
      "dc_region": this.distributionCenterform.value.state,
      "dc_city": this.distributionCenterform.value.city,
      "dc_code": this.distributionCenterform.value.distributionCenterID,
      "dc_name": this.distributionCenterform.value.distributionCentralName
    }
    this.distributinoCenterService.getDistributionCenters(obj).subscribe((response) => {
      this.distributionCenterData = new MatTableDataSource(response[0]);
      this.distributionCenterData.paginator = this.paginator;
      this.distributionCenterData.sort = this.sort;
    })
  }
}

