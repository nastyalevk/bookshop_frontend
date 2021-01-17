import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book/book';
import { UserService } from '../../_services/user/user.service';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { _ } from 'ag-grid-community';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string | undefined;
  books: Book[] | undefined;

  columnDefs = [
    { field: 'id', sortable: true, filter: true, minWidth: 50, maxWidth: 100},
    { field: 'bookName', sortable: true, filter: true },
    { field: 'author', sortable: true, filter: true },
    { field: 'genre', sortable: true, filter: true },
    { field: 'publicationYear', sortable: true, filter: true, minWidth: 50, maxWidth: 100 },
    { field: 'pages', sortable: true, filter: true, minWidth: 50, maxWidth: 100 },
    { field: 'description', sortable: true, filter: true }]
    rowData = new Array();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data =>{
        this.rowData = data;
      }
    );
  }

}