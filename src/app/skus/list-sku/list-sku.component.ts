import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DiscountService} from '../../service/discount.service';
import {ModalService} from '../../messagebox/modal.service';
import {ModalComponent} from '../../messagebox/modal.component';
import {SkuService} from "../../service/sku.service";
import {Sku} from "../../model/sku.model";

@Component({
  selector: 'app-list-sku',
  templateUrl: './list-sku.component.html',
  styleUrls: ['./list-sku.component.css']
})
export class ListSkuComponent implements OnInit {

  skus: Sku[];
  skuToDelete: Sku = null;
  constructor(private router: Router, private skuService: SkuService, private discountService: DiscountService, private modalService: ModalService) { }

  ngOnInit() {
    var data = this.skuService.getSkus()
    this.skus = data;
  };
  
  deleteSku(sku: Sku): void {
    if(window.confirm('Are you sure you want to delete this customer?')){
      this.deleteCallback(sku);
    }
      //var self = this;
    //this.skuToDelete = sku;
    //this.modalService.open('deleteConfirmation', 10000)
  };

  deleteCallback(sku): void {
    this.discountService.deleteAllDiscountsInSku(sku.skuNumber);
    this.skuService.deleteSku(sku.id)
    this.skus = this.skus.filter(u => u !== sku);
  }

  editSku(sku: Sku): void {
    this.router.navigate(['edit-sku', { key: sku.id.toString()} ]);
  };

  addSku(): void {
    this.router.navigate(['add-sku']);
  };

  showSkuDiscounts(sku: Sku) {
    this.router.navigate(['list-discount', { key: sku.skuNumber.toString()}]);
  };

  endFcn(sv:string) {
    alert(sv);
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

