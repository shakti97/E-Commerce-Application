// import { DashBoardRoutingModule } from './../Routes/DashBoardRouting.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { SellerModule } from './seller/seller.module';
import { Router } from '../../node_modules/@angular/router';
import { AppRoutingModule } from 'Routes/appRouting.module';
import { AdminModule } from './admin/admin.module';
import { HeaderComponent } from './user/website/header/header.component';
import { FooterComponent } from './user/website/footer/footer.component';
import { CarouselComponent } from './user/website/carousel/carousel.component';
import { ProductsComponent } from './user/website/products/products.component';
import { MainPageComponent } from './user/website/main-page/main-page.component';
import { CartComponent } from './user/website/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ProductsComponent,
    MainPageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    HttpModule,
    SellerModule,
    AppRoutingModule,AngularFontAwesomeModule,NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
