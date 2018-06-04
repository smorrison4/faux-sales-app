import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DiscountService} from "../../service/discount.service";
import {SkuService} from "../../service/sku.service";
import {Discount} from "../../model/discount.model";
import {Sku} from "../../model/sku.model";

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.css']
})
export class ListDiscountComponent implements OnInit {

  discounts: Discount[];
  skuNumber: string = '';

  constructor(private router: Router, private discountService: DiscountService) { }

  ngOnInit() {
    let skuNumber: string = this.router.routerState.snapshot.url;
    let nIndex = skuNumber.indexOf('key=');
    if( nIndex != -1 ) {
      skuNumber = skuNumber.slice(nIndex+4);
    }
    if(!this.skuNumber) {
      alert("Invalid action in list discount.")
      this.router.navigate(['list-discount']);
      return;
    }
    var data = this.discountService.getDiscountsBySkuNumber(this.skuNumber)
    this.discounts = data;
  }

  deleteDiscount(discount: Discount): void {
    if(window.confirm('Are you sure you want to delete this discount?')){
      this.discountService.deleteDiscount(discount.id)
      this.discounts = this.discounts.filter(u => u !== discount);
    }
  };

  editDiscount(discount: Discount): void {
    this.router.navigate(['edit-discount', { key:discount.id.toString()} ]);
  };

  addDiscount(): void {
    this.router.navigate(['add-discount', { key: this.skuNumber.toString()}]);
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

