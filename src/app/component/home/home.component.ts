import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book/book';
import { BookService } from 'src/app/_services/book/book.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/_services/cart/cart.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  currentBook?: Book;
  currentIndex = -1;
  bookName = '';
  sort: string;
  sorts :Map<String, String>;

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];
  columnSort = 0;

  constructor(private bookService: BookService, protected router: Router, private cartService: CartService, private bookComponent: BookComponent) {
    this.sort = "";
    this.sorts = new Map([]);
  }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAll(this.bookName, this.page, this.pageSize, this.sort)
      .subscribe(
        response => {
          const { content, totalElements } = response.body;

          this.books = content;
          this.count = totalElements;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveBooks();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBooks();
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  LinktoBook(id: number) {
    this.router.navigate([`book/${id}`]);
  }

  sortTable(column: string) {
    // console.log(column)
    if (this.columnSort) {
      this.sorts.set(column, "asc");
      this.columnSort = 0;
    }
    else {
      this.sorts.set(column, "desc");
      this.columnSort = 1;
    }
    this.sort = '';
    for(let [key, value] of this.sorts){
      this.sort +="," +  key + "_"+ value;
    }
    this.sort = this.sort.slice(1, this.sort.length);
    // console.log(this.sort)
    this.retrieveBooks();
  }
}