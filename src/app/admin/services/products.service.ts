import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {globalVariables} from '../../../globalConfig/globalVariables.js';
import { Router, ResolveEnd } from '@angular/router';

@Injectable({

    providedIn: "root"
})

export class ProductsService {
    products: any;
    constructor(private http: HttpClient,private router: Router){ }

    getProducts(){ 
        return this.http.get('http://localhost:1234/showProducts',{
      withCredentials: true
    }).toPromise().then(data=>{
      if(globalVariables.isAuthenticated===true){
      let content:any=data;
      content=content.products;
      
      console.log('the stock obtained is...', content);
      this.products=content;
      
      }

      else{

        localStorage.clear();
        this.router.navigate(['/']);
      }
      
    });
    }
}