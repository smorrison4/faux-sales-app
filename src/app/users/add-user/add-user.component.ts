import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  onSubmit() {
    let user = this.addForm.value;
    if( (! user.email) || (! user.firstName) || (! user.lastName)) {
      alert('Please enter all the fields.');
      return;
    }
    let returnMessage : string = this.userService.createUser(this.addForm.value)
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-user']);
  }
  onCancel() {
    this.router.navigate(['list-user']);
  }
}
