import { Component, OnInit } from '@angular/core';
import UserProductService from 'Services/UserProduct.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts :any;
  productIdArray : String[];
  Quantity : number;
  constructor(private userProduct : UserProductService) {
    this.cartProducts =[],
    this.Quantity=1
   }
  DeleteCartProduct(pId){
    console.log('function delete product trigger');
        this.userProduct.DeleteCartProduct(pId)
            .then((Data)=>{
                if(Data.isProductDeleted){
                    alert('Product Deleted SuccessFully');
                    this.ngOnInit();
                }
                else{
                    alert('Some Error Occured while deleting');
                }
            })
  } 
  UpdateCartProduct(pId,todo){
    this.Quantity=this.Quantity+todo;
    let UpdateProduct=this.userProduct.UpdateCartProduct(pId,todo);
    UpdateProduct.then((Data)=>{
      console.log('Successfully Udated',Data);
      if(Data){
        console.log('Deta updated');
      }
    })
    if(this.Quantity===0){
      this.DeleteCartProduct(pId);
    }
  }
  ngOnInit() {
    let showProducts=this.userProduct.ShowCartProduct();
            showProducts.then((Data)=>{
                console.log("Data",Data);
                this.cartProducts=Data.products;
            })
  }

}
