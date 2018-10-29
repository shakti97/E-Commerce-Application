import { profileData } from './../../../../globalConfig/profileData';
import { Router, NavigationStart,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import {globalVariables} from '../../../../globalConfig/globalVariables.js';
import * as CanvasJS from '../../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  productid: String;
  productname: String;
  producttype: String;
  productbrand: String;
  productprice: Number;
  productquantity: Number;
  isProductAdded: Boolean;
  email: any;
sub:any;
  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute) { 

    this.productid="";
    this.email="email";
    this.isProductAdded=false;
    this.router.events.subscribe(event=>{

      if(event instanceof NavigationStart){
        console.log('navigation started....');

      }
    });
    console.log('profile noe', profileData);
    console.log('admin login cons...');
    
  }


  
  ngOnInit() {

    //code for making the charts....hard coded for now but will make it later for some purpose

    this.sub=this.route.params.subscribe(params=>{

      this.email=params['email'];
      console.log('received email here...', this.email);
    });

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Statistics"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple"},
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();

  //   this.http.get('http://localhost:1234/getOnlineUsers', {
  //    params: {
  //     sessionId: localStorage.getItem('sessionID')
  //    },
  //    withCredentials: true
  // }).toPromise().then(data=>{
    
  //   let content:any=data;
  //   console.log('data from the api',content);
  
  // })
   
  }

  viewProducts(){

    console.log('insidde view products');
    this.router.navigate(['admin/dashboard/products']);
  }

  

  logOut(){

    console.log('inside the logout function...');
    this.http.get('http://localhost:1234/logout',{withCredentials: true}).toPromise().then((response)=>{
let content:any=response;
console.log('content in logout',content);
    if(content.status==200){

      globalVariables.isAuthenticated=false;
      this.router.navigate(['/']);
      console.log('logged out by the front end function');

    }

    else{

      console.log('could not logout user...');
    }

    }).catch(err=>console.log('error in the http promise of loggind out user..'));

    globalVariables.isAuthenticated=false;
    this.router.navigate(['/']);

  }

  viewSellers(){

    this.router.navigate(['admin/dashboard/sellers'])
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  
}
