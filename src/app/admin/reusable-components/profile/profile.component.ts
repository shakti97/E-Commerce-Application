import { Component, OnInit, Input } from '@angular/core';


@Component({

  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})

export class ProfileComponent implements OnInit {

profileData:any;
@Input() email:String;
  constructor() {
   }

  ngOnInit() {

   }

}
