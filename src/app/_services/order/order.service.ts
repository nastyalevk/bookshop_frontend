import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _ } from 'ag-grid-community';
import { OrderComponent } from 'src/app/component/order/order.component';
import { Cart } from 'src/app/model/cart/cart';
import { Order } from 'src/app/model/order/order';
import { OrderContent } from 'src/app/model/orderContent/order-content';

const API_URL = 'http://localhost:8087/';

@Injectable({
  providedIn: 'root'
})
  
export class OrderService {

  orders: Order[];
  orderContent: OrderContent;
  orderContents: OrderContent[];
  items: Cart[];

  constructor(private http: HttpClient) { }

  saveOrderContent(){
    this.orderContents = new Array<OrderContent>();
    for (let item of this.items) {
      this.orderContent = new OrderContent();
      this.orderContent.bookId = item.book.id;
      for (let i of this.orders) {
        if(i.shopId == item.shop.id)
        this.orderContent.orderNumber = i.orderNumber;
      }
      this.orderContent.price = item.shop.price;
      this.orderContent.quantity = item.quantity;
      console.log(this.orderContent);
      this.orderContents.push(this.orderContent);
      // this.saveOrderContentDb(this.orderContent);
    }
    return this.orderContents;
  }
  saveOrder(order: Order) {
    // console.log(order);
    return this.http.post<Order>(API_URL + 'order/create/', order);
  }

  saveOrderContentDb(orderContent: OrderContent){
    return this.http.post<OrderContent>(API_URL + 'order/content/create/', orderContent);

}
}
