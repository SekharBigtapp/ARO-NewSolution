import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/auth/login/services/login.service';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  username: any;
  userRole: any;

  token:any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    public dataStorage: DataStorageService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("username") && (localStorage.getItem("userRole"))) {
      this.username = localStorage.getItem("username");
      this.userRole = localStorage.getItem("userRole");
      //this.token = localStorage.getItem("token")
      // if ((username) && (userRole)) {
      //   this.username = JSON.parse(username);
      //   this.userRole = JSON.parse(userRole);
      // }
      
    }
  }


  onSignOut() {
    //alert();
    // debugger;
    alert("Aru sure you want to signout");
    //debugger;
    let obj= {
      "Username": this.username,
      "Token_generated": localStorage.getItem("token")
    }
    this.loginService.UserLogout(obj).subscribe((response)=>{
      console.log(response)
      localStorage.clear();
      this.dataStorage.isUserLoggedIn = false;
      this.router.navigateByUrl('/')
      
    }, (error)=>{console.log(error)}
    )
  }

}
