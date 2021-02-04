import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order/order';
import { OrderService } from 'src/app/_services/order/order.service';

@Component({
  selector: 'app-board-client',
  templateUrl: './board-client.component.html',
  styleUrls: ['./board-client.component.css']
})
export class BoardClientComponent implements OnInit {
  orders: Order[] = [];
  currentOrder?: Order;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOrders();
    console.log(this.orders);
  }

  getAllOrders() {
    this.orderService.getOrderByUser(this.page, this.pageSize).subscribe(response => {
      const { content, totalElements } = response.body;

      this.orders = content;
      this.count = totalElements;
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }
  goToOrder(orderId: number) {
    this.router.navigate([`/order/edit/${orderId}`]);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllOrders();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllOrders();
  }

  setActiveOrder(order: Order, index: number): void {
    this.currentOrder = order;
    this.currentIndex = index;
  }

}
