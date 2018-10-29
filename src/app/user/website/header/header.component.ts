import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkLogin(){
    if(localStorage.getItem('email')){
      this.router.navigate(['/website/profile']);
    }

    else{

      alert('please login to view profile...');
    }
  }

}
