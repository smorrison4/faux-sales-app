import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {Router} from "@angular/router";
import {Customer} from "../../model/customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    let sKey: string = this.router.routerState.snapshot.url;
    let nIndex = sKey.indexOf('key=');
    if( nIndex != -1 ) {
      sKey = sKey.slice(nIndex+4);
    }
    if(!sKey) {
      alert("Invalid action.")
      this.router.navigate(['list-customer']);
      return;
    }
    let customerId: number = parseInt(sKey, 10);
    let customer: Customer = this.customerService.getCustomerById(customerId);
    this.editForm = this.formBuilder.group({
      id: [],
      clientNumber: [''],
      location: [''],
      email: [''],
      phoneNumber: [''],
      contactName: [''],
    });
    var data = this.customerService.getCustomerById(+customerId)
    this.editForm.setValue(data);
  }

// Keydown listener
/*
@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html'
})
export class AppComponent { 
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));

  check(event: KeyboardEvent) {
    // 31 and below are control keys, don't block them.
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }
}*/

  onSubmit() {
    let customer : Customer = this.editForm.value;
    if(! customer.clientNumber) {
      alert('Please fill in the Client Number.');
      return;
    }
    if(! customer.location) {
      alert('Please fill in the Location.');
      return;
    }
    if(! customer.email) {
      alert('Please fill in the Email.');
      return;
    }
    if(! customer.phoneNumber) {
      alert('Please fill in the Phone Number.');
      return;
    }
    if(! customer.contactName) {
      alert('Please fill in the Contact Name.');
      return;
    }
    let returnMessage: string = this.customerService.updateCustomer(customer);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-customer']);
  }

  onCancel() {
    this.router.navigate(['list-customer']);
  }
}
