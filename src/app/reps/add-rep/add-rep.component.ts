import { Component, OnInit } from '@angular/core';
import {RepService} from "../../service/rep.service";
import {Router} from "@angular/router";
import {Rep} from "../../model/rep.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-rep',
  templateUrl: './add-rep.component.html',
  styleUrls: ['./add-rep.component.css']
})
export class AddRepComponent implements OnInit {

  rep: Rep;
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private repService: RepService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: [],
      initials: [],
      isActive: [],
    });
  }

  onSubmit() {
    let rep : Rep = this.addForm.value;
    if(! rep.firstName) {
      alert('Please fill in the FirstName field.');
      return;
    }
    if(! rep.lastName) {
      alert('Please fill in the LastName field.');
      return;
    }
    if(! rep.email) {
      alert('Please fill in the Email field.');
      return;
    }
    if(! rep.initials) {
      alert('Please fill in the Initials field.');
      return;
    }
    if(! rep.isActive) {
      alert('Please fill in the IsActive field.');
      return;
    }
    let returnMessage: string = this.repService.updateRep(rep);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-rep']);
  }

  onCancel() {
    this.router.navigate(['list-rep']);
  }
}
