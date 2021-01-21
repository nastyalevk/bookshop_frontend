import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book/book';
import { BookService } from 'src/app/_services/book/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: number;
  book: Book;
  price: any;

  constructor(private route: ActivatedRoute,
    private bookService: BookService) {
    this.id = this.route.snapshot.params.id;
    this.book = new Book();
  }


  ngOnInit(): void {
    this.bookService.getOne(this.id).subscribe(data => {
      this.book = data;
      console.log(this.book);
    })
    this.bookService.getPrice(this.id).subscribe(data =>{
      this.price = data;
      console.log(this.price)
    });
  }

}
