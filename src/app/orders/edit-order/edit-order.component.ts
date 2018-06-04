import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../../model/order.model";
import {TransactionType} from "../../Transaction-type.enum";
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
    let sKey: string = this.router.routerState.snapshot.url;
    let nIndex = sKey.indexOf('key=');
    if( nIndex != -1 ) {
      sKey = sKey.slice(nIndex+4);
    }
    if(!sKey) {
      alert("Invalid action.")
      this.router.navigate(['list-order']);
      return;
    }
    let orderId: number = parseInt(sKey, 10);
    let order: Order = this.orderService.getOrderById(orderId);
    this.editForm = this.formBuilder.group({
      id: [],
      creditedRep: [],
      enteredBy: [],
      entryDateAndTime: [],
    });
    var data = this.orderService.getOrderById(+orderId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    let order : Order = this.editForm.value;
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
