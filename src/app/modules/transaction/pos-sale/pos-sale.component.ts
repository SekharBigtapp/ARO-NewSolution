import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos-sale',
  templateUrl: './pos-sale.component.html',
  styleUrls: ['./pos-sale.component.css']
})
export class PosSaleComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
