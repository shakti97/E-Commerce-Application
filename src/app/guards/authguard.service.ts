import { HttpClient } from '@angular/common/http';
import { Injectable } from "../../../node_modules/@angular/core";
import { CanActivate,CanActivateChild,Router ,NavigationStart, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from '../../../node_modules/rxjs';
import { promise } from '../../../node_modules/protractor';
import {globalVariables} from '../../globalConfig/globalVariables.js';




@Injectable()
export class AuthGuardService implements CanActivate{

    shouldLetRoute=false;
    globalVariables: any;
    constructor(private http: HttpClient, private router: Router){

        console.log('inside the guard cons...');
     
         
    }

    findTheSession(){

        let sessionID:any=localStorage.getItem('sessionID');
        console.log('sessionId in the authGuardService obtained was...',sessionID);
        return sessionID;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

        //the below code was for check session via calling server on eveery route and checking !
console.log('inside canActivate...');
//         let isLetRoute=false;
//         let sessionID=this.findTheSession();
//         return new Promise((resolve)=>{

//             this.http.post('http://localhost:1234/checkSession',{

//         sessionId: sessionID,
       
//         },{  withCredentials: true,
//         }).toPromise().then(response=>{if(response==true){

//             resolve(true);
//         }
//     else{

//         this.router.navigate(['/']);
//         resolve(false);
//     }
//     });

// });
console.log('isAuthenticated is initially..',globalVariables.isAuthenticated);

if(globalVariables.isAuthenticated){

    return true;
}
else{

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url },preserveQueryParams: false});
    console.log('currenr url in guard',state.url);
    return false;
}

        
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

        console.log('insde canActivateChild...');
        if(globalVariables.isAuthenticated){

            return true;
        }
        else{
        
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url },preserveQueryParams: false});
            console.log('currenr url in guard',state.url);
            return false;
        }   
    }

 }