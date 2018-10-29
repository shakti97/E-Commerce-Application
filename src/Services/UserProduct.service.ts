import { Http } from '@angular/http';
import { Injectable } from "../../node_modules/@angular/core";
// import {  } from 'util';

@Injectable()
export default class{
    option : any;
    constructor(private _http:Http){
        this.option = {
            withCredentials:true,
        }
    }
    AddToCart(productDetails){
        console.log('addProduct function in UserProduct is running');
        productDetails.userId = localStorage.getItem("customerId");
        let Url = 'http://localhost:1234/addToCart';
        return this._http.post(Url,productDetails,this.option).toPromise()
                   .then(data=> { return data.json()})
                   .catch(error=>{return error})
    }
    ShowCartProduct(){
        console.log('Showing Cart function in Service');
        let Url='http://localhost:1234/showCartProduct/'+ localStorage.getItem("customerId");
        return this._http.get(Url,this.option).toPromise()
            .then(data=>{console.log('Products data.json()',data.json()); return data.json()})
            .catch(error=>{return error});
    }
    DeleteCartProduct(pId){
        // console.log(productId);
        // console.log(isArray(productId));
        console.log('service delete fucntion trigger');
        console.log('options',this.option);
        let Url='http://localhost:1234/deleteCartProduct/'+localStorage.getItem('customerId')+"/"+pId;
        return this._http.delete(Url,this.option).toPromise()
                .then(data=>{console.log('isProduct Deleted'+ data); return data.json()})
                .catch(error=>{ return error});
    }
    UpdateCartProduct(productDetails : any,todo:number){
        console.log("Hello ",productDetails);
        productDetails.userId=localStorage.getItem("customerId");
        productDetails.todo=todo;
        let Url='http://localhost:1234/updateCartProduct/'+productDetails.pId;
        return this._http.put(Url,productDetails,this.option).toPromise()
                .then(data=>{console.log('Product Updated'); return data.json()})
                .catch(error=>{return error});
    }
}      