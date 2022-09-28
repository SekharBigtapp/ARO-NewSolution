import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-managed-inventory',
  templateUrl: './vendor-managed-inventory.component.html',
  styleUrls: ['./vendor-managed-inventory.component.css']
})
export class VendorManagedInventoryComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
