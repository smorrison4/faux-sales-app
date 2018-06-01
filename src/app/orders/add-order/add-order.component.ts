import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../../model/order.model";
import {TransactionType} from "../../Transaction-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      creditedRep: [],
      enteredBy: [],
      entryDateAndTime: [],
    });
  }

  onSubmit() {
    let order : Order = this.addForm.value;
    if(! order.creditedRep) {
      alert('Please fill in the Credited Rep.');
      return;
    }
    if(! order.enteredBy) {
      alert('Please fill in Entered By.');
      return;
    }
    if(! order.entryDateAndTime) {
      alert('Please fill in the Entry Date.');
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
