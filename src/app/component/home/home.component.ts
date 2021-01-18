import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book/book';
import { UserService } from '../../_services/user/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { _ } from 'ag-grid-community';
import { BookService } from 'src/app/_services/book/book.service';

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

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 5];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`bookName`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveBooks(): void {
    console.log(this.pageSize);
    const params = this.getRequestParams(this.bookName, this.page, this.pageSize);

    this.bookService.getAll(params)
      .subscribe(
        response => {
          const { books, totalItems } = response.body;

          this.books = books;
          this.count = totalItems;
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

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = undefined;
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

}