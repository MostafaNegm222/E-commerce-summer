import { Routes } from '@angular/router';
import { Home } from './pages/user/home/home';
import { About } from './pages/user/about/about';
import { Products } from './pages/user/products/products';
import { ProductDetails } from './pages/user/product-details/product-details';
import { Error } from './pages/error/error';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { authGuard } from './guards/auth-guard';
import { AddProduct } from './pages/admin/add-product/add-product';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { ConfirmEmail } from './pages/auth/confirm-email/confirm-email';
import { ForgetPassword } from './pages/auth/forget-password/forget-password';
import { ResetPassword } from './pages/auth/reset-password/reset-password';
import { Profile } from './pages/auth/profile/profile';
import { roleGuard } from './guards/role-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {path : "" , component : MainLayout , children:[
    {path:'' , redirectTo:'home', pathMatch:'full'},
    {path:'home' , component:Home},
    {path:'about' , component:About},
    {path : "auth/me" , component:Profile},
    {path:'products' , component:Products ,canActivate:[authGuard]},
    {path:'products/:id' , component:ProductDetails},
  ]},
  {path : 'auth' , component:AuthLayout , canActivate:[loginGuard], children : [
    {path : '', redirectTo:'login', pathMatch:"full"},
    {path : "login" , component:Login},
    {path : "signup" , component:Signup},
    {path : "confirm-email" , component:ConfirmEmail},
    {path : "forget-password" , component:ForgetPassword},
    {path : "reset-password/:token" , component:ResetPassword},
  ]},
  {path : "admin" , component : AdminLayout , data:{role : "admin"}, canActivate:[roleGuard], children:[
    {path:'' , redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard' , component:Dashboard},
    {path:'products' , component:ManageProducts},
    {path:'products/new' , component:AddProduct},
    {path:'users' , component:ManageUsers},
    ]},
  {path:'**' , component:Error},
];
