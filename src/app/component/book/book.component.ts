import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Book } from 'src/app/model/book/book';
import { Cart } from 'src/app/model/cart/cart';
import { Shop } from 'src/app/model/shop/shop';
import { BookService } from 'src/app/_services/book/book.service';
import { CartService } from 'src/app/_services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  id: number;
  book: Book;
  price: any;
  shops: Shop[] = [];
  isCart: Map<string, boolean>;
  constructor(private route: ActivatedRoute, protected router: Router,
    private bookService: BookService, private appComponent: AppComponent,
    private cartService: CartService) {
    this.id = this.route.snapshot.params.id;
    this.book = new Book();
    this.isCart = new Map<string, boolean>();
  }


  ngOnInit(): void {
    this.bookService.getOne(this.id).subscribe(data => {
      this.book = data;
    })
    this.bookService.getPrice(this.id).subscribe(data => {
      this.price = data;
    });
    this.bookService.getShop(this.id).subscribe(data => {
      this.shops = data;
      for (let i = 0; i < this.shops.length; i++) {
        this.bookService.getShopPrice(this.id, this.shops[i].id).subscribe(data => {
          this.shops[i].price = data;

        });
      }
    })
  }
  onSubmit(shop: Shop) {
    let key = "book_" + this.id.toString()+ "_" + shop.id;
    this.cartService.addToCart(new Cart(this.book, 1, shop));
    this.isCart.set(key, true);
  }

  inCart(shopId: number){
    let key = "book_" + this.id.toString()+ "_" + shopId;
    if(this.cartService.getItem(key)){
      return true;
    }
    return false;
  }
}
