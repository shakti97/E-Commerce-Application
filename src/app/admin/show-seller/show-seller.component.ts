import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import {globalVariables} from '../../../globalConfig/globalVariables.js';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-show-seller',
  templateUrl: './show-seller.component.html',
  styleUrls: ['../../../assets/materialize.min.css']
})
export class ShowSellerComponent implements OnInit {

sellers: any;
id:any;
@ViewChild('sellerid') el:ElementRef;
  constructor(private http: HttpClient,private _location: Location , private router: Router) {

    this.sellers=[];
    this.id;
   }


  ngOnInit() {
    //component mounting call to get the list of sellers
    this.http.get('http://localhost:1234/getSellers', {
     params: {
      sessionId: localStorage.getItem('sessionID')
     },
     withCredentials: true
  }).toPromise().then(data=>
    {
      let sellers:any=data;

      if(sellers.status==403){
        console.log('logout from frontent');
        globalVariables.isAuthenticated=false;
        this.router.navigate(['/']);
      }
      else{
        this.sellers=sellers.content;
        console.log('data is', sellers.content);
      }
  
  });

  }

  goBack(){
    
    if(!localStorage.getItem('sessionID')){
      globalVariables.isAuthenticated=false;
      this.router.navigate(['/']);
    }
    else{

      this._location.back(); 
    }
   }

   deleteSeller(){
     console.log('id obtained',this.el.nativeElement.id);
     this.http.post('http://localhost:1234/deleteSeller',{
       sellerid: this.el.nativeElement.id,
       sessionId: localStorage.getItem('sessionID')
     },{withCredentials: true}).toPromise().then(data=>{

      let response:any=data;
      console.log('data is', response);

      if(response.status==403){

        globalVariables.isAuthenticated=false;
        this.router.navigate(['/']);
      }
      else{

        if(response.isSellerDeleted==true){

          alert('seller deleted successfully...');
          
        }
        else{

          alert('some error occured while deleting the requested seller...');
        }
      }

     });
   }
}
