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
    let sKey: string = this.router.routerState.snapshot.url;
    let nIndex = sKey.indexOf('key=');
    if( nIndex != -1 ) {
      sKey = sKey.slice(nIndex+4);
    }
    if(!sKey) {
      alert("Invalid action.")
      this.router.navigate(['list-rep']);
      return;
    }
    let repId: number = parseInt(sKey, 10);
    let rep: Rep = this.repService.getRepById(repId);
    this.editForm = this.formBuilder.group({
      id: [],
      firstName: [''],
      lastName: [''],
      email: [''],
      initials: [''],
      isActive: [],
    });
    this.editForm.setValue(rep);
  }
  onSubmit() {
    let rep : Rep = this.editForm.value;
    if(! rep.firstName) {
      alert('Please fill in the First Name.');
      return;
    }
    if(! rep.lastName) {
      alert('Please fill in the Last Name.');
      return;
    }
    if(! rep.email) {
      alert('Please fill in the Email.');
      return;
    }
    if(! rep.initials) {
      alert('Please fill in the Initials.');
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
