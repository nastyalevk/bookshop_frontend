import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book/book';
import { BookService } from 'src/app/_services/book/book.service';
import { Router } from '@angular/router';

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
  sort = "id_asc";

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];
  columnSort = 0;

  constructor(private bookService: BookService, protected router: Router) {
  }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number, sort: string): any {
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

    if (sort) {
      params[`sort`] = sort;
    }

    return params;
  }
  retrieveBooks(): void {
    console.log(this.pageSize);
    const params = this.getRequestParams(this.bookName, this.page, this.pageSize, this.sort);

    this.bookService.getAll(params)
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
    console.log(column)
    if (this.columnSort) {
      this.sort = column + "_asc";
      this.columnSort = 0;
    }
    else {
      this.sort = column + "_desc";
      this.columnSort = 1;
    }
    console.log(this.sort)
    this.retrieveBooks();
  }
}