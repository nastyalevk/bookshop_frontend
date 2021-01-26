import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart/cart';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  items = new Map<string, Cart>();

  constructor() { }

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
}
