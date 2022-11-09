import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseHttp {
    signInUrl: string = 'userlogin';
    logOutUrl: string = 'userlogout';
    
    getLoginDetails(requestBody: any){
        return this.login<any>(this.signInUrl,requestBody);
    }

    UserLogout(username:any){
        return this.logout<any>(this.logOutUrl,username);
    }
    
    // UserLogout(userName: any) {
    //     return this.get<any>(this.logoutUrl + "?userName=" + userName);
    // }
}