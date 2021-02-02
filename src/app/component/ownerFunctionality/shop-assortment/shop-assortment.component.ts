import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book/book';
import { AssortmentService } from 'src/app/_services/assortment/assortment.service';
import { BookService } from 'src/app/_services/book/book.service';

@Component({
  selector: 'app-shop-assortment',
  templateUrl: './shop-assortment.component.html',
  styleUrls: ['./shop-assortment.component.css']
})
export class ShopAssortmentComponent implements OnInit {

  id: number;
  books: Book[] = [];
  constructor(private route: ActivatedRoute, protected router: Router, private bookService: BookService, private assortmentService: AssortmentService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.shopAssortment()
  }

  getAllOrders() {
    this.router.navigate([`/orders/shop/${this.id}`]);
  }

  editShop() {
    this.router.navigate([`/shop/edit/${this.id}`]);
  }

  addNewBook() {
    this.router.navigate([`/shop/newBook/${this.id}`]);
  }

  addBook() {
    this.router.navigate([`/shop/addBooks/${this.id}`]);
  }

  shopAssortment() {
    this.bookService.getBooksByShop(this.id).subscribe(
      data => {
        this.books = data;
      }
    );
  }
  goToBookPersonalPage(bookId: number) {
    this.router.navigate([`/shop/${this.id}/book/${bookId}`]);
  }

}
