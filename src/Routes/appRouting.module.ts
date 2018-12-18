import { CrudComponent } from './../app/seller/Crud/crud.component';
import { ProfileComponent } from './../app/seller/Profile/Profile.component';
import { MainDashBoardComponent } from './../app/seller/MainDashBoard/mainDashBoard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from 'app/seller/DashBoard/DashBoard.component';
import { LoginGaurd } from 'Gaurds/LoginGuard';
import { SellerComponent } from 'app/seller/seller/seller.component';
import LoginAuth from 'Services/LoginAuth.service';
import { ShowProductsComponent } from 'app/seller/ShowProducts/showProducts.component';
import { AdminLoginComponent } from 'app/admin/admin-login/admin-login.component';
import { ShowSellerComponent } from 'app/admin/show-seller/show-seller.component';
import { AuthGuardService } from 'app/guards/authguard.service';
import { AdminDashboardComponent } from 'app/admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { MainPageComponent } from 'app/user/website/main-page/main-page.component';
import { CartComponent } from 'app/user/website/cart/cart.component';
import { UserProfileComponent } from 'app/user/user/user-profile/user-profile.component';
import { ViewProductsComponent } from 'app/admin/admin-dashboard/show-products/show-products.component';

const routes: Routes = [
    {
        path: '',component: AdminLoginComponent
    },
    {
        path : 'Seller', redirectTo : 'LoginPage', pathMatch : 'full', 
    },
    {
        path : 'LoginPage',
        component : SellerComponent,
    },
    {

        path: 'website', component: MainPageComponent
  
      },
      {
          path:'website/profile', component: UserProfileComponent
      },
  
      {
        path: 'admin/dashboard/sellers', component: ShowSellerComponent,
        canActivate: [AuthGuardService]
      },
      {

        path: 'admin/dashboard/:email', component: AdminDashboardComponent,
        canActivate: [AuthGuardService]
       
      },
      {
        path: 'admin/mystock', component: ViewProductsComponent,
        canActivate: [AuthGuardService]
    },
      {
          path : "website/cart",
          component : CartComponent
      },
    {
        path : 'Seller/DashBoard' ,
        component : DashBoardComponent ,
        canActivate : [LoginGaurd],
        children : [
            {
                path : '',
                component : MainDashBoardComponent
            },
            {
                path : 'MainDashBoard',
                component : MainDashBoardComponent,
            },
            {
                path : 'Profile' ,
                component : ProfileComponent ,
            },
            {
                path : 'Crud',
                component : CrudComponent,
            },
            {
                path :'ShowProducts',
                component : ShowProductsComponent
            }

        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers :[LoginGaurd,LoginAuth]
})

export class AppRoutingModule{}