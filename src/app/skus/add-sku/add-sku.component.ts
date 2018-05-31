import { Component, OnInit } from '@angular/core';
import {SkuService} from "../../service/sku.service";
import {Router} from "@angular/router";
import {Sku} from "../../model/sku.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-sku',
  templateUrl: './add-sku.component.html',
  styleUrls: ['./add-sku.component.css']
})
export class AddSkuComponent implements OnInit {

  sku: Sku;
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private skuService: SkuService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      skuNumber: [],
      name: [],
      description: [],
      regularPrice: [],
      discounts: [],
    });
  }

  onSubmit() {
    let sku : Sku = this.addForm.value;
    if(! sku.skuNumber) {
      alert('Please fill in the SkuNumber field.');
      return;
    }
    if(! sku.name) {
      alert('Please fill in the Name field.');
      return;
    }
    if(! sku.description) {
      alert('Please fill in the Description field.');
      return;
    }
    if(! sku.regularPrice) {
      alert('Please fill in the RegularPrice field.');
      return;
    }
    let returnMessage: string = this.skuService.updateSku(sku);
    if( returnMessage != '') {
      alert(returnMessage);
    }
    this.router.navigate(['list-sku']);
  }

  onCancel() {
    this.router.navigate(['list-sku']);
  }
}
