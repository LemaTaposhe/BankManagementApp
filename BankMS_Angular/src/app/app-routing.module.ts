//import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { UserComponent } from './user/user.component';
//import { CommonModule } from '@angular/common';
//import { AccountComponent } from './account/account.component';
//import { LoanComponent } from './loan/loan.component';
//import { TransactionComponent } from './transaction/transaction.component';

//const routes: Routes = [
//  {
//    path: 'home', data: { title: 'Home' },
//    children: [{ path: '', component: HomeComponent }] // Add the Home route
//  },
//  {
//    path: 'user', data: { title: 'User' },
//    children: [{ path: '', component: UserComponent }]
//  },
//  {
//    path: 'account', data: { title: 'Account' },
//    children: [{ path: '', component: AccountComponent }]
//  },
//  {
//    path: 'loan', data: { title: 'Loan' },
//    children: [{ path: '', component: LoanComponent }]
//  },
//  {
//    path: 'transaction', data: { title: 'Transaction' },
//    children: [{ path: '', component: TransactionComponent }]
//  },

//  {
//    path: '', redirectTo: '/home', pathMatch: 'full' // Redirect the default path to Home
//  }
//];

//@NgModule({
//  imports: [CommonModule, RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { LoanComponent } from './loan/loan.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//import { LoginComponent } from './login/login.component'; // Import LoginComponent
//import { RegistrationComponent } from './registration/registration.component'; // Import RegistrationComponent

const routes: Routes = [
  {
    path: 'home', data: { title: 'Home' },
    children: [{ path: '', component: HomeComponent }]
  },
  {
    path: 'user', data: { title: 'User' },
    children: [{ path: '', component: UserComponent }]
  },
  {
    path: 'account', data: { title: 'Account' },
    children: [{ path: '', component: AccountComponent }]
  },
  {
    path: 'loan', data: { title: 'Loan' },
    children: [{ path: '', component: LoanComponent }]
  },
  {
    path: 'transaction', data: { title: 'Transaction' },
    children: [{ path: '', component: TransactionComponent }]
  },
  {
    path: 'login', data: { title: 'Login' }, // Add Login route
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'register', data: { title: 'Register' }, // Add Registration route
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full' // Redirect the default path to Home
  },
  { path: '**', redirectTo: '/home' } // Wildcard route to handle undefined paths
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
