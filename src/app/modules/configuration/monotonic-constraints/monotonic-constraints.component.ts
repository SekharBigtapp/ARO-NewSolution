import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monotonic-constraints',
  templateUrl: './monotonic-constraints.component.html',
  styleUrls: ['./monotonic-constraints.component.css']
})
export class MonotonicConstraintsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['configurations']);
  }
}