import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.css']
})
export class StockRegisterComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
