import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Users/login/login.component";
import {AddCustomerComponent} from "./Customers/add-customer/add-customer.component";
import {ListCustomerComponent} from "./Customers/list-customer/list-customer.component";
import {EditCustomerComponent} from "./Customers/edit-customer/edit-customer.component";
import {AddOrderComponent} from "./Orders/add-order/add-order.component";
import {ListOrderComponent} from "./Orders/list-order/list-order.component";
import {EditOrderComponent} from "./Orders/edit-order/edit-order.component";
import {AddRepComponent} from "./Reps/add-rep/add-rep.component";
import {ListRepComponent} from "./Reps/list-rep/list-rep.component";
import {EditRepComponent} from "./Reps/edit-rep/edit-rep.component";
import {AddSkuComponent} from "./Skus/add-sku/add-sku.component";
import {ListSkuComponent} from "./Skus/list-sku/list-sku.component";
import {EditSkuComponent} from "./Skus/edit-sku/edit-sku.component";
import {AddUserComponent} from "./Users/add-user/add-user.component";
import {ListUserComponent} from "./Users/list-user/list-user.component";
import {EditUserComponent} from "./Users/edit-user/edit-user.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'list-order', component: ListOrderComponent },
  { path: 'edit-order', component: EditOrderComponent },
  { path: 'add-rep', component: AddRepComponent },
  { path: 'list-rep', component: ListRepComponent },
  { path: 'edit-rep', component: EditRepComponent },
  { path: 'add-sku', component: AddSkuComponent },
  { path: 'list-sku', component: ListSkuComponent },
  { path: 'edit-sku', component: EditSkuComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
