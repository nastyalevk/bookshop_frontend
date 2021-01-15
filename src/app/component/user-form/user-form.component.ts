import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role/role';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User;
  roles: string[] = [];
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
    this.user = new User();
    this.user.activated = true;
    console.log(this.user.activated);
  }
  ngOnInit() {  }

  onSubmit() {
    this.user.roles = this.rolesToEntity();
    console.log(this.user.roles);
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
    }

  gotoUserList() {
    this.router.navigate(['/admin']);
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
  getActivated(): boolean{
    let result = false;
    if(this.user.activated){
      console.log(result);
      result = true;
      return result;
    }
console.log(result);
    return result;
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
