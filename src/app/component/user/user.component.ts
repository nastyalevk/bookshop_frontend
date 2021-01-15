import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'inspector';
import { Role } from 'src/app/model/role/role';
import { User } from 'src/app/model/user/user';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';
import { UserService } from 'src/app/_services/user/user.service';
import { BoardAdminComponent } from '../board/board-admin/board-admin.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  roles: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private boardAdminComponent: BoardAdminComponent,
    private tokenStorage: TokenStorageService) {
    this.user = new User();
  }

  onSubmit() {
    this.user.roles = this.rolesToEntity();
    console.log(this.user.roles);
    this.userService.update(this.user).subscribe(result => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/admin']);
  }

  ngOnInit() {
    this.userService.getOne(this.route.snapshot.params.id).subscribe(data => {
      this.user = data;
      for (let i of this.user.roles) {
        this.roles.push(i.name);
        window.localStorage.setItem("roles", i.name);
      }
    })
  }

getRoleStatus(role: string){
  let result =  false;
  for(let i of this.roles){
    if(i == role){
      result = true;
    }
  }
  return result;
}

  activatedChange(state: boolean) {
    this.user.activated = state;
  }

  changeRoleStatusClient(state: boolean) {
    if(state){
      this.roles.push("ROLE_CLIENT");
    }
    else{
      this.roles = this.roles.filter(role => role != "ROLE_CLIENT");
      console.log(this.roles);
    }    
  }

  changeRoleStatusOwner(state: boolean) {
    if(state){
      this.roles.push("ROLE_OWNER");
    }
    else{
      this.roles = this.roles.filter(role => role != "ROLE_OWNER");
      console.log(this.roles);
    }    
  }

  changeRoleStatusAdmin(state: boolean) {
    if(state){
      this.roles.push("ROLE_ADMIN");
    }
    else{
      this.roles = this.roles.filter(role => role != "ROLE_ADMIN");
      console.log(this.roles);
    }    
  }

  rolesToEntity(){
    let rolesEntity = new Array<Role>();
    for(let i of this.roles){
      if(i == "ROLE_ADMIN"){
        let role = new Role(1, "ROLE_ADMIN");
        rolesEntity.push(role);
      }
      if(i == "ROLE_OWNER"){
        let role = new Role(2, "ROLE_OWNER");
        rolesEntity.push(role);
      }
      if(i == "ROLE_CLIENT"){
        let role = new Role(3, "ROLE_CLIENT");
        rolesEntity.push(role);
      }
    }
    return rolesEntity;
  }

}
