import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {Router} from "@angular/router";
import {Customer} from "../../model/customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer;
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      clientNumber: [],
      location: [],
      email: [],
      phoneNumber: [],
      contactName: [],
    });
  }

  onSubmit() {
    let customer : Customer = this.addForm.value;
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
