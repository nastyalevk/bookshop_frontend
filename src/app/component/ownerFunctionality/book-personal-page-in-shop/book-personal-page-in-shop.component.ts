import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assortment } from 'src/app/model/assortment/assortment';
import { Book } from 'src/app/model/book/book';
import { AssortmentService } from 'src/app/_services/assortment/assortment.service';
import { BookService } from 'src/app/_services/book/book.service';

@Component({
  selector: 'app-book-personal-page-in-shop',
  templateUrl: './book-personal-page-in-shop.component.html',
  styleUrls: ['./book-personal-page-in-shop.component.css']
})
export class BookPersonalPageInShopComponent implements OnInit {

  assortment: Assortment;
  bookId: number;
  shopId: number;
  book: Book;
  today = new Date();
  classifications=["open", "active", "waiting", "closed"];
  classif: string;
  quantity: number;
  price: number;

  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = this.today.getFullYear();
  constructor(private route: ActivatedRoute, protected router: Router, private bookService: BookService,
    private assortmentService: AssortmentService) {
    this.assortment = new Assortment();
    this.bookId = this.route.snapshot.params.bookId;
    this.shopId = this.route.snapshot.params.shopId;
    this.book = new Book();
  }

  ngOnInit(): void {
    this.bookService.getOne(this.bookId).subscribe(data => {
      this.book = data;

    });
    this.assortmentService.getOne(this.bookId, this.shopId).subscribe(data => {
      this.quantity = data.quantity;
      this.price = data.price
      this.classif = data.classification;

    });

    console.log(this.assortment);

  }

  onSubmitBook() {
    this.assortment.bookId = this.bookId.toString();
    this.assortment.shopId = this.shopId;
    this.assortment.creationDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    this.assortment.classification = this.classif;
    this.assortment.quantity = this.quantity;
    this.assortment.price = this.price;
    this.assortmentService.saveAssortment(this.assortment).subscribe(data => {
      this.assortment = this.assortment;
    })
    // this.router.navigate([`/shop/${this.shopId}`]);  
  }

  deleteFromShop() {
    this.assortmentService.deleteAssortment(this.bookId, this.shopId).subscribe();
    // this.router.navigate([`/shop/${this.shopId}`]);

  }
}
