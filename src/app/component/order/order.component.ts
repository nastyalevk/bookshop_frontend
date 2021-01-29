import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart/cart';
import { Order } from 'src/app/model/order/order';
import { OrderContent } from 'src/app/model/orderContent/order-content';
import { CartService } from 'src/app/_services/cart/cart.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  items: Cart[];
  orderContent: OrderContent;
  order: Order;
  today = new Date();
  itemsInOrder: Cart[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private cartService: CartService, private userService: UserService,
    private tokenStorage: TokenStorageService, private orderService: OrderService) {
    this.items = this.cartService.toArray();
    this.order = new Order();
    this.order.cost = 0;
    this.orderContent = new OrderContent();
  }

  ngOnInit(): void { }

  onSubmit() {
    let shops = this.cartService.getShopList();
    let orderAmound = this.cartService.getShopsAmound(shops);
    let dd = String(this.today.getDate()).padStart(2, '0');
    let ddnew = String(this.today.getDate() + 1).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0');
    let yyyy = this.today.getFullYear();
    let deliveryAddress = this.order.deliveryAddress;
    let description = this.order.description;
    for (let i = 0; i < orderAmound; i++) {
      this.itemsInOrder = new Array<Cart>();
      this.order = new Order();
      this.order.deliveryAddress = deliveryAddress;
      this.order.description = description;
      this.order.cost = 0;
      this.order.classificationId = 10;
      this.order.classificationStatus = 'open';
      this.order.orderSubmitDate = mm + '/' + dd + '/' + yyyy;;
      this.order.shopId = shops[i].id;
      this.order.orderCompleteDate = mm + '/' + ddnew + '/' + yyyy;
      this.order.username = this.tokenStorage.getUser().username;
      this.order.orderNumber = Math.random() * 10000;
      for (let item of this.items) {
        if (item.shop.shopName == shops[i].shopName) {
          this.itemsInOrder.push(item)
          this.order.cost += item.quantity * item.shop.price;
        }
      }
      this.orderService.saveOrder(this.order).subscribe(data => {
        this.order = data;
        for (let item of this.itemsInOrder) {
          this.orderContent = new OrderContent();
          this.orderContent.bookId = item.book.id;
          this.orderContent.orderId = data.orderId;
          this.orderContent.price = item.shop.price;
          this.orderContent.quantity = item.quantity
          this.orderService.saveOrderContent(this.orderContent).subscribe();
        }
      });
    }
    this.cartService.clearCart();
    this.router.navigate(['/order-info']);
  }

}
