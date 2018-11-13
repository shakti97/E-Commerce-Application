import { profileData } from './../../../../globalConfig/profileData';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
email: any;
gender: any;
username: any;
status: any;
  constructor(private router: Router) {
    
    this.email=localStorage.getItem('email');
    this.gender=localStorage.getItem('gender');
    this.username=localStorage.getItem('username');
    this.status=localStorage.getItem('status');
   }

  ngOnInit(){

  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/website']);
    alert('logged out successfully...');
  }

}
