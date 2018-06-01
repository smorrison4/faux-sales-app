import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Discount} from '../model/discount.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class DiscountService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/discounts';

  discounts: Discount[] = [
    new Discount(1, 'Sku1', false, 0, 5, false, '', '1/1/2011', '1/1/2021'),
    new Discount(2, 'Sku1', false, 5, 0, false, '', '1/2/2012', '1/2/2022'),
    new Discount(3, 'Sku1', false, 10, 0, true, '', '1/3/2013', '1/3/2023'),
    new Discount(4, 'Sku1', false, 15, 0, false, '', '1/4/2014', '1/4/2024'),
    new Discount(5, 'Sku1', false, 20, 0, false, '', '1/1/2011', '1/1/2021'),
    new Discount(6, 'Sku2', false, 0, 10, false, '', '1/2/2012', '1/2/2022'),
    new Discount(7, 'Sku2', false, 10, 0, true, '', '1/3/2013', '1/3/2023'),
    new Discount(8, 'Sku2', false, 12, 0, false, '', '1/4/2014', '1/4/2024'),
    new Discount(9, 'Sku2', false, 0, 12, false, '', '1/1/2011', '1/1/2021'),
    new Discount(10, 'Sku3', false, 3, 0, false, '', '1/2/2012', '1/2/2022'),
    new Discount(11, 'Sku3', false, 13, 0, true, '', '1/3/2013', '1/3/2023'),
    new Discount(12, 'Sku3', false, 23, 0, false, '', '1/4/2014', '1/4/2024'),
    new Discount(13, 'Sku3', false, 0, 23, false, '', '1/1/2011', '1/1/2021'),
    new Discount(14, 'Sku3', false, 0, 13, false, '', '1/2/2012', '1/2/2022'),
    new Discount(15, 'Sku3', false, 0, 5, true, '', '1/3/2013', '1/3/2023'),
    new Discount(16, 'Sku4', false, 15, 0, false, '', '1/4/2014', '1/4/2024'),
 ];
 
  getDiscounts() : Discount[] {
    return this.discounts;
  }

  getDiscountsBySkuNumber(skuNumber: string) : Discount[] {
    let  discountsInSku: Discount[] = [];
    this.discounts.forEach( (item, index) => {
      if(item.skuNumber === skuNumber) {
        discountsInSku.push(item);
      }
    });
    return discountsInSku;
  }

  getDiscountById(id: number) : Discount {
    let jMax: number = this.discounts.length;
    // Cannot break in a foreach
    for( let j = 0; j < jMax; j++ ) {
      if( this.discounts[j].id === id ) {
        return this.discounts[j];
      }
    }
    return null;
    //return this.http.get<Discount>(this.baseUrl + '/' + id);
  }

  findDiscount(discount: Discount) : Discount {
    this.discounts.forEach( function(testDiscount) {
      if( testDiscount.id === discount.id) { 
        return testDiscount;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createDiscount (discount: Discount) : string {
    let testDiscount: Discount = this.findDiscount(discount);
    if( testDiscount != null) {
      return 'Already added: id is: ' + testDiscount.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.discounts.length;
    if( this.discounts.length > 0 ) {
      newId = this.discounts[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.discounts[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    discount.id = newId;
    this.discounts.push(discount);
    return '';
    //return this.http.post(this.baseUrl, discount);
  }

  updateDiscount(discount: Discount) : string {
    let isFound : boolean = false;
    this.discounts.forEach( (item, index) => {
      if(item.id === discount.id) {
        isFound = true;
        this.discounts[index] = discount;
      }
    });
    if( isFound) {
      return '';
    }
    return 'Discount was not found';
    //return this.http.put(this.baseUrl + '/' + discount.id, discount);
  }

  deleteAllDiscountsInSku (skuNumber: string) {
    let jMax = this.discounts.length;
    for( var j = jMax-1; j >= 0; j-- ) {
      var item = this.discounts[j];
      if(item.skuNumber === skuNumber) {
        this.discounts.splice(j,1);
      }
    }
  }
  
  deleteDiscount (id: number) : string {
    this.discounts.forEach( (item, index) => {
      if(item.id === id) {
        this.discounts.splice(index,1);
        return '';
      }
    });
    return 'Discount not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}
