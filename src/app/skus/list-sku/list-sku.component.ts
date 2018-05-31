import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SkuService} from "../../service/sku.service";
import {Sku} from "../../model/sku.model";

@Component({
  selector: 'app-list-sku',
  templateUrl: './list-sku.component.html',
  styleUrls: ['./list-sku.component.css']
})
export class ListSkuComponent implements OnInit {

  skus: Sku[];

  constructor(private router: Router, private skuService: SkuService) { }

  ngOnInit() {
    var data = this.skuService.getSkus()
    this.skus = data;
  }

  deleteSku(sku: Sku): void {
    this.skuService.deleteSku(sku.id)
    this.skus = this.skus.filter(u => u !== sku);
  };

  editSku(sku: Sku): void {
    localStorage.removeItem("editSkuId");
    localStorage.setItem("editSkuId", sku.id.toString());
    this.router.navigate(['edit-sku']);
  };

  addSku(): void {
    this.router.navigate(['add-sku']);
  };

  showSkuDiscounts(sku: Sku) {
    localStorage.removeItem("listSkuNumberForDiscounts");
    localStorage.setItem("listSkuNumberForDiscounts", sku.skuNumber);
    this.router.navigate(['list-discount']);
  }

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
    if( menuItem == "USERS") {
      this.router.navigate(['list-user']);
      return;
    }
    this.router.navigate(['list-sku']);
  }
}

