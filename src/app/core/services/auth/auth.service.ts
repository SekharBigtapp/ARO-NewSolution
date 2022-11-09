import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean = false;
    constructor(
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
          
        console.log(this.isAuthenticated);    
        if (localStorage.getItem("token")) {
             this.isAuthenticated = true;
        }
        console.log(this.isAuthenticated);    
        if (!this.isAuthenticated) {
            this.router.navigate(["/"]);
        }
        return this.isAuthenticated;
    }
}
