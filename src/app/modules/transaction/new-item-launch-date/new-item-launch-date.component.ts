import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-item-launch-date',
  templateUrl: './new-item-launch-date.component.html',
  styleUrls: ['./new-item-launch-date.component.css']
})
export class NewItemLaunchDateComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
