import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let sUserId: string = localStorage.getItem("editUserId");
    if(!sUserId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    let userId: number = parseInt(sUserId, 10);
    let user: User = this.userService.getUserById(userId);
    this.editForm = this.formBuilder.group({
      id: [],
      //email: ['', Validators.required],
      email: [''],
      firstName: [''],
      lastName: ['']
    });
    var data = this.userService.getUserById(+userId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    let user : User = this.editForm.value;
    if( (! user.email) || (! user.firstName) || (! user.lastName) ) {
      alert('Please enter all the fields.');
      return;
    }
    let returnMessage: string = this.userService.updateUser(user);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-user']);
  }

  onCancel() {
    this.router.navigate(['list-user']);
  }
}
