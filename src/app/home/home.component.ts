import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string | undefined;
  books: Book[] | undefined;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.books = data;
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
      }
    );
  }
}