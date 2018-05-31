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
    this.skuNumber = localStorage.getItem("listSkuNumberForDiscounts");
    if(!this.skuNumber) {
      alert("Invalid action in list discount.")
      this.router.navigate(['list-discount']);
      return;
    }
    var data = this.discountService.getDiscountsBySkuNumber(this.skuNumber)
    this.discounts = data;
  }

  deleteDiscount(discount: Discount): void {
    this.discountService.deleteDiscount(discount.id)
    this.discounts = this.discounts.filter(u => u !== discount);
  };

  editDiscount(discount: Discount): void {
    localStorage.removeItem("editDiscountId");
    localStorage.setItem("editDiscountId", discount.id.toString());
    this.router.navigate(['edit-discount']);
  };

  addDiscount(): void {
    localStorage.removeItem("editSkuIsForDiscount");
    localStorage.setItem("editSkuIsForDiscount", this.skuNumber);
    this.router.navigate(['add-discount']);
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

