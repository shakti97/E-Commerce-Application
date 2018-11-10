import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import {globalVariables} from '../../../../globalConfig/globalVariables.js';
import { Router } from '@angular/router';

@Component({
  selector: 'view-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ViewProductsComponent implements OnInit {
products: any;
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:1234/showProducts', {
      // params: {
      //  sessionId: localStorage.getItem('sessionID')
      // },
      withCredentials: true).toPromise().then(data=>{
      if(globalVariables.isAuthenticated===true){
      let content:any=data;
      
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
