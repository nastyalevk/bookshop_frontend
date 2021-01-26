import { Book } from "../book/book";
import { Shop } from "../shop/shop";

export class Cart {
    book: Book;
    quantity: number;
    shop:Shop;

    constructor(book:Book, quantity:number, shop: Shop){
        this.book = book;
        this.shop = shop;
        this.quantity = quantity;
    }
}
