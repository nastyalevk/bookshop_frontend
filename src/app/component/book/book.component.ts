import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Book } from 'src/app/model/book/book';
import { Cart } from 'src/app/model/cart/cart';
import { BookReview } from 'src/app/model/review/book/book-review';
import { Shop } from 'src/app/model/shop/shop';
import { BookService } from 'src/app/_services/book/book.service';
import { CartService } from 'src/app/_services/cart/cart.service';
import { ReviewService } from 'src/app/_services/review/review.service';

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
  reviews: BookReview[] = [];
  review: BookReview;
  constructor(private route: ActivatedRoute, protected router: Router,
    private bookService: BookService, private appComponent: AppComponent,
    private cartService: CartService,
    private reviewService: ReviewService) {
    this.id = this.route.snapshot.params.id;
    this.book = new Book();
    this.isCart = new Map<string, boolean>();
    this.review = new BookReview();
    this.review.rating = 0;
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
    });
    this.reviewService.getBookReview(this.id).subscribe(data => {
      this.reviews = data;
    })
  }
  onSubmit(shop: Shop) {
    if (this.appComponent.isClient()) {
      let key = "book_" + this.id.toString() + "_" + shop.id;
      this.cartService.addToCart(new Cart(this.book, 1, shop));
      this.isCart.set(key, true);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  inCart(shopId: number) {
    let key = "book_" + this.id.toString() + "_" + shopId;
    if (this.cartService.getItem(key)) {
      return true;
    }
    return false;
  }

  goToShop(shopId: number) {
    this.router.navigate([`/shop/page/${shopId}`]);
  }

  saveComment() {
    this.review.bookId = this.id;
    this.reviewService.saveBookReview(this.review).subscribe();
  }
}
