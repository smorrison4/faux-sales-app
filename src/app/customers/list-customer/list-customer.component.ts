import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[];

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    var data = this.customerService.getCustomers()
    this.customers = data;
  }

  deleteCustomer(customer: Customer): void {
    if(window.confirm('Are you sure you want to delete this customer?')){
      this.customerService.deleteCustomer(customer.id)
      this.customers = this.customers.filter(u => u !== customer);
    }
  };

  editCustomer(customer: Customer): void {
    this.router.navigate(['edit-customer', { key: customer.id.toString()} ]);
  };

  addCustomer(): void {
    this.router.navigate(['add-customer']);
  };

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

