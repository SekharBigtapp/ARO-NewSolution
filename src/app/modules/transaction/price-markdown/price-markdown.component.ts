import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-markdown',
  templateUrl: './price-markdown.component.html',
  styleUrls: ['./price-markdown.component.css']
})
export class PriceMarkdownComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backButtonClick(){
    this.router.navigate(['transaction']);
  }
}
