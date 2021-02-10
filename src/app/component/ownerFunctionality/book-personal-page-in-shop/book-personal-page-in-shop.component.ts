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

  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = String(this.today.getFullYear());
  hh = String(this.today.getHours());
  MM = String(this.today.getMinutes());
  ss = String(this.today.getSeconds());
  
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
      this.assortment = data;
    });

    console.log(this.assortment);

  }

  onSubmitBook() {
    this.assortment.creationDate = this.yyyy + "-" + this.mm + "-" + this.dd + " " + this.hh + ":" + this.MM + ":" + this.ss;
    console.log(this.assortment);
    this.assortmentService.saveAssortment(this.assortment).subscribe(data => {
      this.assortment = this.assortment;
      this.ngOnInit()
    });
  }

  deleteFromShop() {
    this.assortmentService.deleteAssortment(this.bookId, this.shopId).subscribe(()=>{this.ngOnInit()});
  }
}
