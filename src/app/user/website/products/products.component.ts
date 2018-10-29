import { Component, OnInit } from '@angular/core';
import CrudProductService from 'Services/CrudProduct.service';
import UserProductService from 'Services/UserProduct.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : any;
  constructor(private crudProduct : CrudProductService,private userProduct : UserProductService) {
    this.products=[];
   }
  addToCart(pId : number){
    let productDetails = {
      productId : pId
    }
    this.userProduct.AddToCart(productDetails)
      .then((Data)=>{
        if(Data.isProductAdded){
          alert('added to product successfully');
        }
        else{
          alert('Some Error While Adding');
        }
      })

  }
  ngOnInit() {
    let showProducts=this.crudProduct.ShowProducts();
            showProducts.then((Data)=>{
                console.log("Data",Data);
                this.products=Data.products;
            })
  }

}
