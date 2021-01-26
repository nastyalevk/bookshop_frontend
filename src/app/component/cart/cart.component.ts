import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart/cart';
import { CartService } from 'src/app/_services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Cart[];
  bookQuantity = [1, 2, 3, 4];
  constructor(private cartService: CartService) {
    this.items = this.cartService.toArray();

  }

  ngOnInit(): void {
    this.items = this.cartService.toArray();
  }

  remove(item: Cart) {
    this.cartService.remove(item);
    this.ngOnInit();
  }

  handleQuantityChange(event: any, item: Cart): void {
    let quantity = event.target.value;
    item.quantity = quantity;
    this.cartService.addToCart(item);
  }
  order(){
    
  }
}
