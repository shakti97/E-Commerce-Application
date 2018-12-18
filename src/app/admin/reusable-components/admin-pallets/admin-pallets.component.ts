import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-pallet',
  templateUrl: './admin-pallets.component.html',
  styleUrls: ['./admin-pallets.component.css']
})
export class AdminPalletsComponent implements OnInit {
count: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  this.http.get('http://localhost:1234/ProductCount').toPromise().then(data=>{
    console.log('recieved prod count', data);
    let content:any=data;
    this.count=content.count;
  })
  }

}
