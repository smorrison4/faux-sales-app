import { Component, OnInit } from '@angular/core';
import {SkuService} from "../../service/sku.service";
import {Router} from "@angular/router";
import {Sku} from "../../model/sku.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-sku',
  templateUrl: './edit-sku.component.html',
  styleUrls: ['./edit-sku.component.css']
})
export class EditSkuComponent implements OnInit {
  isInCancel : boolean = false;
  sku: Sku;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private skuService: SkuService) { }

  ngOnInit() {
    let sSkuId: string = localStorage.getItem("editSkuId");
    if(!sSkuId) {
      alert("Invalid action.")
      this.router.navigate(['list-sku']);
      return;
    }
    let skuId: number = parseInt(sSkuId, 10);
    let sku: Sku = this.skuService.getSkuById(skuId);
    this.editForm = this.formBuilder.group({
      id: [],
      skuNumber: [''],
      name: [''],
      description: [''],
      regularPrice: [''],
    });
    var data = this.skuService.getSkuById(+skuId)
    this.editForm.setValue(data);
  }

  onSubmit() {
    if( this.isInCancel ) {
      this.isInCancel = false;
      this.router.navigate(['list-sku']);
      return;
    }
    let sku : Sku = this.editForm.value;
    if(! sku.skuNumber) {
      alert('Please fill in the Sku Number field.');
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
      alert('Please fill in the Regular Price field.');
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
