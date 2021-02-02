import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order/order';
import { BookService } from 'src/app/_services/book/book.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { ShopService } from 'src/app/_services/shop/shop.service';

@Component({
  selector: 'app-orders-by-shop',
  templateUrl: './orders-by-shop.component.html',
  styleUrls: ['./orders-by-shop.component.css']
})
export class OrdersByShopComponent implements OnInit {

  id: number;
  orders: Order[] = [];
  constructor(private route: ActivatedRoute, protected router: Router, private orderService: OrderService, 
    private shopService: ShopService, private bookService: BookService) { 
      this.id = this.route.snapshot.params.id;
    }

  ngOnInit(): void {
    this.getAllOrders();
    console.log(this.orders);
  }


  getAllOrders() {
    this.orderService.getOrderByShop(this.id).subscribe(data => {
      this.orders = data;
      console.log(data);
    });
   
  }
  editShop() {
    this.router.navigate([`/shop/edit/${this.id}`]);
  }
  addNewBook() {
    this.router.navigate([`/shop/newBook/${this.id}`]);
  }

  addBook(){
    this.router.navigate([`/shop/addBooks/${this.id}`]);
  }

  shopAssortment(){
    this.router.navigate([`/shop/${this.id}`]);
  }

  goToOrder(orderId: number){
    this.router.navigate([`order/edit/${orderId}`]);
  }
}
