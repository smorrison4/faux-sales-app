import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order} from '../model/order.model';
import { TransactionType} from '..//transaction-type.enum';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/orders';

  orders: Order[] = [
    new Order(1, 'Rep1', TransactionType.SalesOrder, 'Rep1', '5/21/2018'),
    new Order(2, 'Rep2', TransactionType.Adjustment, 'Rep2', '5/22/2018'),
    new Order(3, 'Rep3', TransactionType.WalkInOrder, 'Rep3', '5/23/2018'),
    new Order(4, 'Rep4', TransactionType.SalesOrder, 'Rep4', '5/24/2018'),
 ];

  getOrders() : Order[] {
    return this.orders;
  }

  getOrderById(id: number) : Order {
    let jMax: number = this.orders.length;
    for( let j = 0; j < jMax; j++ ) {
      if( this.orders[j].id === id ) {
        return this.orders[j];
      }
    }
    return null;
    //return this.http.get<Order>(this.baseUrl + '/' + id);
  }

  findOrder(order: Order) : Order {
    this.orders.forEach( function(testOrder) {
      if( testOrder.id === order.id) { 
        return testOrder;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createOrder (order: Order) : string {
    let testOrder: Order = this.findOrder(order);
    if( testOrder != null) {
      return 'Already added: id is: ' + testOrder.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.orders.length;
    if( this.orders.length > 0 ) {
      newId = this.orders[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.orders[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    order.id = newId;
    this.orders.push(order);
    return '';
    //return this.http.post(this.baseUrl, order);
  }

  updateOrder(order: Order) : string {
    let isFound : boolean = false;
    this.orders.forEach( (item, index) => {
      if(item.id === order.id) {
        isFound = true;
        this.orders[index] = order;
      }
    });
    if( isFound) {
      return '';
    }
    return 'Order was not found';
    //return this.http.put(this.baseUrl + '/' + order.id, order);
  }

  deleteOrder (id: number) : string {
    this.orders.forEach( (item, index) => {
      if(item.id === id) {
        this.orders.splice(index,1);
        return '';
      }
    });
    return 'Order not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}

