import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { LoginService } from './services/login.service';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import MyAppHttp from 'src/app/core/services/myAppHttp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  loginData: any;

  validation_messages = {
    userName: [
      { type: 'required', message: 'Please enter valid user id' },
      { type: 'pattern', message: 'Please enter valid User Id' },
      { type: 'maxlength', message: 'Password should be maximum 50 characters.' }
    ],
    password: [
      { type: 'required', message: 'Please enter password' },
      { type: 'pattern', message: 'Please enter valid password' },
      { type: 'minlength', message: 'Password should be minimum 12 Alphanumeric characters length and should contain at least on upper case letter, one special and one numeric character. ' },
      { type: 'maxlength', message: 'Password should be maximum 20 characters.' }
    ]
  };
  
  errorFlag: boolean = false;
  authorizationMessage: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public dataStorage: DataStorageService) 
    {
      
     }


     ngOnInit(): void {
      if (this.dataStorage.isUserLoggedIn) {
        let data = localStorage.getItem("token");
        if (data) {
          //this.loginData = JSON.parse(data);
          this.router.navigateByUrl("dashboard")
        }


        
      }
      this.LoginForm = this.formBuilder.group({
        userName: [
          null,
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            // Validators.pattern(
            //   /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
            // ),
          ]),
        ],
        //password: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.pattern(MyAppHttp.passwordValidation)])],
        password: ['', Validators.compose([Validators.required])],
        //rememberMe: [false]
      });
  
    }

    clkSignin() {
      //alert();
      
      //this.errorFlag = false;
      if (this.LoginForm.valid) {
       // alert("login")
        localStorage.setItem("username", this.LoginForm.value.userName);
        localStorage.setItem("password", this.LoginForm.value.password);
        //let encryptedPassword = btoa(this.LoginForm.value.password);
        this.loginService.getLoginDetails(
          {
            "Username": this.LoginForm.value.userName,
            "Password": this.LoginForm.value.password,
          }
        ).subscribe((response:any) => {
          console.log(response)
          this.router.navigateByUrl("dashboard")
          this.authorizationMessage = MyAppHttp.ToasterMessage.activeOrNot;
          this.dataStorage.isUserLoggedIn = true
          localStorage.setItem("token", response.Token_generated);
          localStorage.setItem("username", response.username)
          localStorage.setItem("userRole", response.role)
        }, (error) => {
          console.log(error.error.message)
          this.errorFlag = true;
          this.authorizationMessage = error.error.message;
          // let errorMessage = error.error.response.message;
          // this.sendReceiveService.showToast(MyAppHttp.ToastType.ERROR, 'Error', errorMessage);
        });
      }
      else {
        this.errorFlag = true;
        // this.authorizationMessage = response.message;
        //this.sendReceiveService.showToast(MyAppHttp.ToastType.ERROR, 'Error', response.message);
      }
    }
  }
function dashboard(dashboard: any) {
  throw new Error('Function not implemented.');
}

