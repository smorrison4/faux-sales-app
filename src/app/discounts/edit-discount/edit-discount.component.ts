import { Component, OnInit } from '@angular/core';
import {DiscountService} from "../../service/discount.service";
import {SkuService} from "../../service/sku.service";
import {Router} from "@angular/router";
import {Discount} from "../../model/discount.model";
import {Sku} from "../../model/sku.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  discount: Discount;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private discountService: DiscountService) { }

  ngOnInit() {
    let sDiscountId: string = localStorage.getItem("editDiscountId");
    if(!sDiscountId) {
      alert("Invalid action.")
      this.router.navigate(['list-discount']);
      return;
    }
    let discountId: number = parseInt(sDiscountId, 10);
    let discount: Discount = this.discountService.getDiscountById(discountId);
    this.editForm = this.formBuilder.group({
      id: [],
      skuNumber: [],
      isBogo: [],
      percentOff: [],
      amountOff: [],
      isDisplayRequired: [],
      qualifyingTerms: [],
      startDate: [],
      endDate: [],
    });
    var data = this.discountService.getDiscountById(+discountId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    let discount : Discount = this.editForm.value;
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