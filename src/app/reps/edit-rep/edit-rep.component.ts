import { Component, OnInit } from '@angular/core';
import {RepService} from "../../service/rep.service";
import {Router} from "@angular/router";
import {Rep} from "../../model/rep.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-rep',
  templateUrl: './edit-rep.component.html',
  styleUrls: ['./edit-rep.component.css']
})
export class EditRepComponent implements OnInit {

  rep: Rep;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private repService: RepService) { }

  ngOnInit() {
    let sRepId: string = localStorage.getItem("editRepId");
    if(!sRepId) {
      alert("Invalid action.")
      this.router.navigate(['list-rep']);
      return;
    }
    let repId: number = parseInt(sRepId, 10);
    let rep: Rep = this.repService.getRepById(repId);
    this.editForm = this.formBuilder.group({
      id: [],
      firstName: [''],
      lastName: [''],
      email: [''],
      initials: [''],
      isActive: [''],
    });
    var data = this.repService.getRepById(+repId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    let rep : Rep = this.editForm.value;
    if(! rep.firstName) {
      alert('Please fill in the First Name field.');
      return;
    }
    if(! rep.lastName) {
      alert('Please fill in the Last Name field.');
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
      alert('Please fill in the Active field.');
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
