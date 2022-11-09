import { Component } from '@angular/core';
// import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { DataStorageService } from './core/services/data-storage.service';
import { Event, RouterEvent, Router, NavigationStart, NavigationEnd } from '@angular/router';

let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aroDashboard';

  constructor(public dataStorage: DataStorageService,
    private router: Router,) {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
      if (e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        
        if (localStorage.getItem("token")) { 
          console.log(this.dataStorage.isUserLoggedIn);       
          this.dataStorage.isUserLoggedIn = true;         
        }
       
      }
    });
  }

}
