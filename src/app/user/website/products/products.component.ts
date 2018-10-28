import { Component, OnInit } from '@angular/core';
import CrudProductService from 'Services/CrudProduct.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : any;
  constructor(private crudProduct : CrudProductService) {
    this.products=[];
   }

  ngOnInit() {
    let showProducts=this.crudProduct.ShowProduct();
            showProducts.then((Data)=>{
                console.log("Data",Data);
                this.products=Data.products;
            })
  }

}
