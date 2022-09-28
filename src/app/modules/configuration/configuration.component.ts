import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  systemConfigClick(){
    this.router.navigate(['configurations/systemConfig']);
  }
  storeTransferClick(){
    this.router.navigate(['configurations/storeTransfer']);
  }
  schedulingClick(){
    this.router.navigate(['configurations/scheduling']);
  }
  ForecasteConfig(){
    this.router.navigate(['configurations/forecastconfig'])
  }
  monotonicConfig(){
    this.router.navigate(['configurations/monotonicconfig'])
  }

}

