import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RepService} from "../../service/rep.service";
import {Rep} from "../../model/rep.model";

@Component({
  selector: 'app-list-rep',
  templateUrl: './list-rep.component.html',
  styleUrls: ['./list-rep.component.css']
})
export class ListRepComponent implements OnInit {

  reps: Rep[];

  constructor(private router: Router, private repService: RepService) { }

  ngOnInit() {
    var data = this.repService.getReps()
    this.reps = data;
    var jMax = this.reps.length;
    for( var j = 0; j < jMax; j++ ) {
      var rep = this.reps[j];
    }
  }

  deleteRep(rep: Rep): void {
    if(window.confirm('Are you sure you want to delete this rep?')){
      this.repService.deleteRep(rep.id)
      this.reps = this.reps.filter(u => u !== rep);
    }
  };

  editRep(rep: Rep): void {
    this.router.navigate(['edit-rep', { key: rep.id.toString()} ]);
  };

  addRep(): void {
    this.router.navigate(['add-rep']);
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

