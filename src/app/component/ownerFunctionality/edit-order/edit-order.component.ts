import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book/book';
import { Order } from 'src/app/model/order/order';
import { OrderContent } from 'src/app/model/orderContent/order-content';
import { BookService } from 'src/app/_services/book/book.service';
import { OrderService } from 'src/app/_services/order/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  model: NgbDateStruct;
  order: Order;
  orderId: number;
  orderContents: OrderContent[] = [];
  books: Book[] = [];
  bookQuantity = [1, 2, 3, 4];

  dd: number;
  mm: number;
  yyyy: number;
  constructor(private orderService: OrderService, private route: ActivatedRoute, protected router: Router,
    private bookService: BookService) {
    this.orderId = this.route.snapshot.params.orderId;
    this.order = new Order();
  }

  ngOnInit(): void {
    this.orderService.getOne(this.orderId).subscribe(data => {
      this.order = data;
    });
    this.orderService.getOrderContent(this.orderId).subscribe(data => {
      this.orderContents = data;
      console.log(this.orderContents);
      for (let i of this.orderContents) {
        this.bookService.getOne(i.bookId).subscribe(data => {
          this.books.push(data)
        })
      }
    })
  }

  saveOrder() {
    if (this.model) {
      this.dd = this.model.day;
      this.mm = this.model.month;
      this.yyyy = this.model.year;
      this.order.orderCompleteDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    }
    this.orderService.saveOrder(this.order).subscribe(data => {
      this.order = data;
    });
    window.location.reload();
  }
  deleteOrder() {

  }

  handleQuantityChange(event: any, item: OrderContent): void {
    let quantity = event.target.value;
    item.quantity = quantity;
  }

  removeBook(bookId: number) {
  }

  saveChanges(orderContent: OrderContent) {
    this.orderService.saveOrderContent(orderContent).subscribe();
    window.location.reload();
  }
}
