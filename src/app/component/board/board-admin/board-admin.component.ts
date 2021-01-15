import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { User } from 'src/app/model/user/user';
import { UserService } from '../../../_services/user/user.service';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { _ } from 'ag-grid-community';

@Component({
  // selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular | undefined;

  columnDefs = [
    { field: 'id', sortable: true, filter: true, width: 100 },
    { field: 'username', sortable: true, filter: true, width: 150 },
    { field: 'email', sortable: true, filter: true },
    { field: 'firstName', sortable: true, filter: true, width: 150 },
    { field: 'lastName', sortable: true, filter: true, width: 175 },
    { field: 'activated', sortable: true, filter: true, minWidth: 70, maxWidth: 90 },
    { field: 'roles', sortable: true, filter: true, valueGetter: ((params: { data: { roles: any; }; }) => {
        var result = '';
        for (let i of params.data.roles) {
          result += i.name.substr(5, i.name.lenght) + " ";
        }
        return result;
      })
    }];
  rowData = new Array();
  row: any[];
  constructor(private userService: UserService, protected router: Router) {
    this.row = [];
    this.rowData = new Array<User>();
  }

  ngOnInit() {
    this.userService.findAll().subscribe(
      data => {
        this.rowData = data;
      }
    );

  }
  getSelectedRow() {
    this.row = this.agGrid.api.getSelectedRows();
    if (this.row.length > 0) {
      let id = this.row[0].id
      this.router.navigate([`edit-user/${id}`])
    }
    localStorage.clear();
  }

}

