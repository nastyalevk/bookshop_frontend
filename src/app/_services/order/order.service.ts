import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _ } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order/order';
import { OrderContent } from 'src/app/model/orderContent/order-content';

const API_URL = 'http://localhost:8087/';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { 
  }
  saveOrder(order: Order):Observable<Order> {
    return this.http.post<Order>(API_URL + 'order/create/', order);
  }

  saveOrderContent(orderContent: OrderContent):Observable<OrderContent> {
    return this.http.post<OrderContent>(API_URL + 'order/content/create/', orderContent);
  }
}
