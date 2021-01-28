import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderContent } from 'src/app/model/orderContent/order-content';
import { CartService } from 'src/app/_services/cart/cart.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.css']
})
export class OrderSubmitComponent implements OnInit {

  orderContents: OrderContent[];

  constructor(private route: ActivatedRoute,
    private router: Router, private cartService: CartService, private userService: UserService,
    private tokenStorage: TokenStorageService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderContents = this.orderService.saveOrderContent();
    for (let orderContent of this.orderContents) {
      this.orderService.saveOrderContentDb(orderContent).subscribe();
    }
  }
  onSubmit(){
    this.router.navigate(['/home']);
  }
}