import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public isUserLoggedIn: Boolean = false;
  public MenuList: any;
}