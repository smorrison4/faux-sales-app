import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../../model/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {first} from "rxjs/operators";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  order: Order;
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      repGettingCredit: [],
      enteredBy: [],
      entryDateAndTime: [],
    });
  }

  onSubmit() {
    let order : Order = this.addForm.value;
    if(! order.repGettingCredit) {
      alert('Please fill in the RepGettingCredit field.');
      return;
    }
    if(! order.enteredBy) {
      alert('Please fill in the EnteredBy field.');
      return;
    }
    if(! order.entryDateAndTime) {
      alert('Please fill in the EntryDateAndTime field.');
      return;
    }
    let returnMessage: string = this.orderService.updateOrder(order);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-order']);
  }

  onCancel() {
    this.router.navigate(['list-order']);
  }
}
