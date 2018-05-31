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
      alert('Please fill in the Sku field.');
      return;
    }
    if(! discount.skuNumber) {
      alert('Please fill in the SkuNumber field.');
      return;
    }
    if(! discount.percentOff) {
      alert('Please fill in the PercentOff field.');
      return;
    }
    if(! discount.amountOff) {
      alert('Please fill in the AmountOff field.');
      return;
    }
    if(! discount.isDisplayRequired) {
      alert('Please fill in the IsDisplayRequired field.');
      return;
    }
    if(! discount.qualifyingTerms) {
      alert('Please fill in the QualifyingTerms field.');
      return;
    }
    if(! discount.startDate) {
      alert('Please fill in the StartDate field.');
      return;
    }
    if(! discount.endDate) {
      alert('Please fill in the EndDate field.');
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
