import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart/cart';
import { OrderContent } from 'src/app/model/orderContent/order-content';
import { Shop } from 'src/app/model/shop/shop';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = new Map<string, Cart>();
  orderContent: OrderContent;

  constructor(private orderService: OrderService) { }

  addToCart(item: Cart) {
    let key = "book_" + item.book.id.toString() + "_" + item.shop.id;
    this.items.set(key, item);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = new Map<string, Cart>();
    return this.items;
  }

  getItem(key: string) {
    return this.items.get(key);
  }

  toArray(): Cart[] {
    return Array.from(this.items.values());
  }
  
  remove(item: Cart) {
    let key = "book_" + item.book.id.toString() + "_" + item.shop.id;
    this.items.delete(key);
  }

  getShopList(): Shop[] {
    let shops = new Array<Shop>();
    for (let key of this.items.keys()) {
      shops.push(this.items.get(key).shop)
    }
    return shops;
  }

  getShopsAmound(shops: Shop[]) {
    let shopNames = new Array<string>();
    for (let shop of shops) {
      shopNames.push(shop.shopName);
    }
    var uniqueArray = [];
    for (let i = 0; i < shopNames.length; i++) {
      if (uniqueArray.indexOf(shopNames[i]) === -1) {
        uniqueArray.push(shopNames[i]);
      }
    }
    return uniqueArray.length;
  }
}
