import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    var data = this.userService.getUsers()
    this.users = data;
  }

  deleteUser(user: User): void {
    if(window.confirm('Are you sure you want to delete this user?')){
      this.userService.deleteUser(user.id)
      this.users = this.users.filter(u => u !== user);
    }
  };

  editUser(user: User): void {
    this.router.navigate(['edit-user', { key: user.id.toString()} ]);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
// tryHere
  menuClick(menuItem: string) {
    menuItem = menuItem.toUpperCase();
    if( menuItem == "CUSTOMERS") {
      this.router.navigate(['list-customer']);
      return;
    }
    if( menuItem === "ORDERS") {
      this.router.navigate(['list-order']);
      return;
    }
    if( menuItem == "REPS") {
      this.router.navigate(['list-rep']);
      return;
    }
    if( menuItem == "SKUS") {
      this.router.navigate(['list-sku']);
      return;
    }
    this.router.navigate(['list-user']);
  }
}
