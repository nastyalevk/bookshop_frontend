import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './component/board/board-admin/board-admin.component';
import { BoardClientComponent } from './component/board/board-client/board-client.component';
import { BoardOwnerComponent } from './component/board/board-owner/board-owner.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { UserComponent } from './component/user/user.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { BookComponent } from './component/book/book.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'client', component: BoardClientComponent },
  { path: 'owner', component: BoardOwnerComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'edit-user/:id', component: UserComponent },
  { path: 'new', component: UserFormComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent }
  // { path: '', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }