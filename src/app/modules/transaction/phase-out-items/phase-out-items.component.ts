import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-out-items',
  templateUrl: './phase-out-items.component.html',
  styleUrls: ['./phase-out-items.component.css']
})
export class PhaseOutItemsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
