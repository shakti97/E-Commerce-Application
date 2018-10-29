import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images=['http://newsmobile.in/wp-content/uploads/2016/12/mandalay-bay-retail-shoppes-at-mandalay-place-girl-shopping.tif.image_.1440.550.high_.jpg','https://www.mallofamerica.com/sites/default/files/2017-10/shopping-hero-first_card.jpg',
'https://www.portones.com.uy/innovaportal/file/149/1/home---locales.jpg'];

  constructor() {
   }

  ngOnInit() {
  }

}
