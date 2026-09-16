import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/user/home/home').then(m => m.Home) },
      { path: 'about', loadComponent: () => import('./pages/user/about/about').then(m => m.About) },
      { path: 'auth/me', loadComponent: () => import('./pages/auth/profile/profile').then(m => m.Profile) },
      { path: 'products', loadComponent: () => import('./pages/user/products/products').then(m => m.Products), canActivate: [authGuard] },
      { path: 'products/:id', loadComponent: () => import('./pages/user/product-details/product-details').then(m => m.ProductDetails) },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    canActivate: [loginGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
      { path: 'signup', loadComponent: () => import('./pages/auth/signup/signup').then(m => m.Signup) },
      { path: 'confirm-email', loadComponent: () => import('./pages/auth/confirm-email/confirm-email').then(m => m.ConfirmEmail) },
      { path: 'forget-password', loadComponent: () => import('./pages/auth/forget-password/forget-password').then(m => m.ForgetPassword) },
      { path: 'reset-password/:token', loadComponent: () => import('./pages/auth/reset-password/reset-password').then(m => m.ResetPassword) },
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
    data: { role: 'admin' },
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'products', loadComponent: () => import('./pages/admin/manage-products/manage-products').then(m => m.ManageProducts) },
      { path: 'products/new', loadComponent: () => import('./pages/admin/add-product/add-product').then(m => m.AddProduct) },
      { path: 'users', loadComponent: () => import('./pages/admin/manage-users/manage-users').then(m => m.ManageUsers) },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/error').then(m => m.Error)
  },
];
