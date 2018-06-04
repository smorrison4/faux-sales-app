import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order.model";
import {TransactionType} from "../../Transaction-type.enum";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: Order[];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    var data = this.orderService.getOrders()
    this.orders = data;
  }

  deleteOrder(order: Order): void {
    if(window.confirm('Are you sure you want to delete this order?')){
      this.orderService.deleteOrder(order.id)
      this.orders = this.orders.filter(u => u !== order);
    }
  };

  editOrder(order: Order): void {
    this.router.navigate(['edit-order', { key: order.id.toString()} ]);
  };

  addOrder(): void {
    this.router.navigate(['add-order']);
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

