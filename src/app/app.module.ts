// import { DashBoardRoutingModule } from './../Routes/DashBoardRouting.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SellerModule } from './seller/seller.module';
import { Router } from '../../node_modules/@angular/router';
import { AppRoutingModule } from 'Routes/appRouting.module';
import { AdminModule } from './admin/admin.module';
import { HeaderComponent } from './user/website/header/header.component';
import { FooterComponent } from './user/website/footer/footer.component';
import { CarouselComponent } from './user/website/carousel/carousel.component';
import { ProductsComponent } from './user/website/products/products.component';
import { CartComponent } from './user/website/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    HttpModule,
    SellerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
