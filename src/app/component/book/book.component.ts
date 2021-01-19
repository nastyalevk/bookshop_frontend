import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book/book';
import { User } from 'src/app/model/user/user';
import { BookService } from 'src/app/_services/book/book.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: number;
  book: Book;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private homeComponent: HomeComponent,) {
    this.id = this.route.snapshot.params.id;
    this.book = new Book();
  }


  ngOnInit(): void {
    this.bookService.getOne(this.id).subscribe(data => {
      this.book = data;
      console.log(this.book);
    })
  }

}
