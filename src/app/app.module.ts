import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BoardAdminComponent } from './component/board/board-admin/board-admin.component';
import { BoardOwnerComponent } from './component/board/board-owner/board-owner.component';
import { BoardClientComponent } from './component/board/board-client/board-client.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AgGridModule } from 'ag-grid-angular';
import { UserComponent } from './component/user/user.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookComponent } from './component/book/book.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { OrderSubmitComponent } from './component/order-submit/order-submit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardOwnerComponent,
    BoardClientComponent,
    UserComponent,
    UserFormComponent,
    BookComponent,
    CartComponent,
    OrderComponent,
    OrderSubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]), 
    NgxPaginationModule
  ],
  providers: [
    authInterceptorProviders, 
    BoardAdminComponent, 
    HomeComponent, 
    CartComponent, 
    BookComponent
  ],
  bootstrap: [AppComponent, BoardAdminComponent]
})
export class AppModule { }