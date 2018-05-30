import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../../model/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    let sOrderId: string = localStorage.getItem("editOrderId");
    if(!sOrderId) {
      alert("Invalid action.")
      this.router.navigate(['list-order']);
      return;
    }
    let orderId: number = parseInt(sOrderId, 10);
    let order: Order = this.orderService.getOrderById(orderId);
    this.editForm = this.formBuilder.group({
      id: [],
      repGettingCredit: ['', Validators.required],
      enteredBy: ['', Validators.required],
      entryDateAndTime: ['', Validators.required],
    });
    var data = this.orderService.getOrderById(+orderId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    let order : Order = this.editForm.value;
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
