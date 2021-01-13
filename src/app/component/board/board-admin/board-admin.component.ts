import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from '../../../_services/user/user.service';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';

  users: User[] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.findAll().subscribe(
      data => {
        this.users = data;
      }
    );
    
  }
}