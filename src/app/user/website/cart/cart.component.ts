import { Component, OnInit } from '@angular/core';
import UserProductService from 'Services/UserProduct.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers : [UserProductService]
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
    console.log('PID ',pId);
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
    let UpdateProduct=this.userProduct.UpdateCartProduct({pId :pId},todo);
    UpdateProduct.then((Data)=>{
      console.log('Successfully Udated',Data);
      if(Data){
        console.log('Deta updated');
        this.ngOnInit();
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
                console.log('this.cardProducts ',this.cartProducts);
            })
  }

}
