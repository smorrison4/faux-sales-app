import { Component, OnInit } from '@angular/core';
import {DiscountService} from "../../service/discount.service";
import {SkuService} from "../../service/sku.service";
import {Router} from "@angular/router";
import {Discount} from "../../model/discount.model";
import {Sku} from "../../model/sku.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  discount: Discount;
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private discountService: DiscountService, private skuService: SkuService) { }

  ngOnInit() {
    let skuNumber: string = localStorage.getItem("editSkuIsForDiscount");

    this.addForm = this.formBuilder.group({
      skuNumber: [],
      isBogo: [],
      percentOff: [],
      amountOff: [],
      isDisplayRequired: [],
      qualifyingTerms: [],
      startDate: [],
      endDate: [],
    });
  }

  onSubmit() {
    let discount : Discount = this.addForm.value;
    if(! discount.skuNumber) {
      alert('Please fill in the Sku.');
      return;
    }
    if((discount.percentOff) == null && (discount.amountOff == null)) {
      alert('Please fill in the Percent Off of Amount Off.');
      return;
    }
    if(! discount.isDisplayRequired) {
      alert('Please fill in the Is Display Required.');
      return;
    }
    if(! discount.startDate) {
      alert('Please fill in the Start Date.');
      return;
    }
    let returnMessage: string = this.discountService.updateDiscount(discount);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-discount']);
  }

  onCancel() {
    this.router.navigate(['list-discount']);
  }
}
