import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer} from '../model/customer.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/customers';

  customers: Customer[] = [
    new Customer(1, 'Customer1','Location1', 'email1@gmail.com', '555-555-5551', 'Contact1'),
    new Customer(2, 'Customer2','Location2', 'email2@gmail.com', '555-555-5552', 'Contact2'),
    new Customer(3, 'Customer3','Location3', 'email3@gmail.com', '555-555-5553', 'Contact3'),
    new Customer(4, 'Customer4','Location4', 'email4@gmail.com', '555-555-5554', 'Contact4'),
 ];

  getCustomers() : Customer[] {
    return this.customers;
  }

  getCustomerById(id: number) : Customer {
    let jMax: number = this.customers.length;
    for( let j = 0; j < jMax; j++ ) {
      if( this.customers[j].id === id ) {
        return this.customers[j];
      }
    }
    return null;
    //return this.http.get<Customer>(this.baseUrl + '/' + id);
  }

  findCustomer(customer: Customer) : Customer {
    this.customers.forEach( function(testCustomer) {
      if( testCustomer.clientNumber === customer.clientNumber) { 
        return testCustomer;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createCustomer (customer: Customer) : string {
    let testCustomer: Customer = this.findCustomer(customer);
    if( testCustomer != null) {
      return 'Already added: id is: ' + testCustomer.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.customers.length;
    if( this.customers.length > 0 ) {
      newId = this.customers[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.customers[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    customer.id = newId;
    this.customers.push(customer);
    return '';
    //return this.http.post(this.baseUrl, customer);
  }

  updateCustomer(customer: Customer) : string {
    let isFound : boolean = false;
    this.customers.forEach( (item, index) => {
      if(item.id === customer.id) {
        isFound = true;
        this.customers[index] = customer;
      }
    });
    if( isFound) {
      return '';
    }
    return 'Customer was not found';
    //return this.http.put(this.baseUrl + '/' + customer.id, customer);
  }

  deleteCustomer (id: number) : string {
    this.customers.forEach( (item, index) => {
      if(item.id === id) {
        this.customers.splice(index,1);
        return '';
      }
    });
    return 'Customer not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}

