import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assortment } from 'src/app/model/assortment/assortment';
import { Book } from 'src/app/model/book/book';
import { AssortmentService } from 'src/app/_services/assortment/assortment.service';
import { BookService } from 'src/app/_services/book/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  book = new Book();
  id: number;
  assortment = new Assortment();

  bookId:number;
  today = new Date();

  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = this.today.getFullYear();
  constructor(private route: ActivatedRoute, protected router: Router, private bookService: BookService, private assortmentService: AssortmentService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  getAllOrders() {
    this.router.navigate([`/orders/shop/${this.id}`]);

  }
  editShop() {
    this.router.navigate([`/shop/edit/${this.id}`]);
  }
  addNewBook() { }
  addBook() { 
    this.router.navigate([`/shop/addBooks/${this.id}`]);
  }
  shopAssortment() { 
    this.router.navigate([`/shop/${this.id}`]);
  }

  onSubmitBook() {
    this.bookService.saveBook(this.book).subscribe(data => {
      this.assortment.bookId = data.id;
      this.assortment.shopId = this.id;
      this.assortment.creationDate = this.mm + '/' + this.dd + '/' + this.yyyy;
      this.assortment.classificationId = 5;
      this.assortment.classificationStatus = "open";
      this.assortmentService.saveAssortment(this.assortment).subscribe();
    });
    window.location.reload();


  }
}
