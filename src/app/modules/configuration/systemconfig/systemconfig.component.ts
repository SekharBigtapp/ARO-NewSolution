import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemConfigService } from './systemconfig.service';

@Component({
  selector: 'app-systemconfig',
  templateUrl: './systemconfig.component.html',
  styleUrls: ['./systemconfig.component.css']
})
export class SystemconfigComponent implements OnInit {
  dailyForm!: FormGroup;
  weeklyForm!: FormGroup;
  monthlyForm!: FormGroup;
  checkvalue: boolean = true;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemConfigService: SystemConfigService
  ) { }

  ngOnInit(): void {
    this.dailyForm = this.formBuilder.group({
      noOfDays: ['1'],
      time: ['', Validators.required]
    });
    this.weeklyForm = this.formBuilder.group({
      date: ['1'],
      time: ['', Validators.required],
      weekDay: ['', Validators.required],
    });
    this.monthlyForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      monthCount: ['1']
    });
    
  }

  checkall(event: any) {
    console.log(event.target.value)
    let checkbox1 = document.getElementById("checkItemA") as HTMLInputElement;
    let checkbox2 = document.getElementById("checkItemB") as HTMLInputElement;
    let checkbox3 = document.getElementById("checkItemC") as HTMLInputElement;
    if (event.target.value == "on" && this.checkvalue) {
      checkbox1.checked = true;
      checkbox2.checked = true;
      checkbox3.checked = true;
      this.checkvalue = !this.checkvalue;
    } else {
      checkbox1.checked = false;
      checkbox2.checked = false;
      checkbox3.checked = false;
      this.checkvalue = !this.checkvalue;
    }


  }
  backButtonClick() {
    this.router.navigate(['configurations']);
  }

  onDailyFormSubmit() {
    console.log(this.dailyForm.value);
    let Obj = {
      "frequencycategory": "Daily",
      "weeklyday": "Sunday",
      "weeklyno": this.dailyForm.value.noOfDays,
      "category": "Sports & Outdoor",
      "subcategory": "Projectors",
      "date": "",
      "product": "Sunny Life Swimming Cap Unicorn",
      
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.dailyForm.reset();
      this.dailyForm.controls['noOfDays'].setValue(1);
    })
  }

  onWeeklyFormSubmit() {
    console.log(this.weeklyForm.value);
    let Obj = {
      "frequencycategory": "Weekly",
      "Job_Name": "",
      "No_Of_Weeks": this.weeklyForm.value.date,
      "Time": this.weeklyForm.value.time,
      "Days": this.weeklyForm.value.weekDay
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.weeklyForm.reset();
      this.weeklyForm.controls['date'].setValue(1);
    })
  }

  onMonthlyFormSubmit() {
    console.log(this.monthlyForm.value);
    let Obj = {
      "frequencycategory": "Monthly",
      "Job_Name": "",
      "Day": this.monthlyForm.value.date,
      "Time": this.monthlyForm.value.time,
      "Time_Duration": this.monthlyForm.value.monthCount
    }
    console.log(Obj);
    this.systemConfigService.saveJobConfig(Obj).subscribe((response) => {
      console.log(response);
      this.monthlyForm.reset();
      this.monthlyForm.controls['monthCount'].setValue(1);
    })
  }

  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
