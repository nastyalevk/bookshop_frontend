import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart/cart';
import { OrderContent } from 'src/app/model/orderContent/order-content';
import { Shop } from 'src/app/model/shop/shop';
import { runInThisContext } from 'vm';
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
    console.log(shops);
    return shops;
  }
  saveOrderContent(orderNumber: number) {
    for (let item of this.items) {
      this.orderContent.bookId = item[1].book.id;
      this.orderContent.orderNumber = orderNumber;
      this.orderContent.price = item[1].shop.price;
      this.orderContent.quantity = item[1].quantity;
      this.orderService.saveOrderContent(this.orderContent).subscribe();
    }
    this.clearCart();
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
    console.log(uniqueArray);
    return uniqueArray.length;
  }
}
