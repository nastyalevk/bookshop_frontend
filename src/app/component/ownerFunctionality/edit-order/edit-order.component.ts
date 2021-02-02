import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/model/order/order';
import { OrderContent } from 'src/app/model/orderContent/order-content';
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
  orderContents:OrderContent[]=[];

  constructor(private calendar: NgbCalendar, private orderService: OrderService, private route: ActivatedRoute, protected router: Router) {
    this.orderId = this.route.snapshot.params.orderId;
    this.order = new Order();
  }

  ngOnInit(): void {
    this.orderService.getOne(this.orderId).subscribe(data => {
      this.order = data;
     

    }) 
    this.orderService.getOrderContent(this.orderId).subscribe(data=>{
      this.orderContents = data;
      console.log(this.orderContents);
    })
  }

  saveOrder() {

  }
  deleteOrder() {

  }
}
