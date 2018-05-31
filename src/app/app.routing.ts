import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Users/login/login.component";
import {AddCustomerComponent} from "./Customers/add-customer/add-customer.component";
import {EditCustomerComponent} from "./Customers/edit-customer/edit-customer.component";
import {ListCustomerComponent} from "./Customers/list-customer/list-customer.component";
import {AddDiscountComponent} from "./Discounts/add-discount/add-discount.component";
import {EditDiscountComponent} from "./Discounts/edit-discount/edit-discount.component";
import {ListDiscountComponent} from "./Discounts/list-discount/list-discount.component";
import {AddOrderComponent} from "./Orders/add-order/add-order.component";
import {EditOrderComponent} from "./Orders/edit-order/edit-order.component";
import {ListOrderComponent} from "./Orders/list-order/list-order.component";
import {AddRepComponent} from "./Reps/add-rep/add-rep.component";
import {EditRepComponent} from "./Reps/edit-rep/edit-rep.component";
import {ListRepComponent} from "./Reps/list-rep/list-rep.component";
import {AddSkuComponent} from "./Skus/add-sku/add-sku.component";
import {EditSkuComponent} from "./Skus/edit-sku/edit-sku.component";
import {ListSkuComponent} from "./Skus/list-sku/list-sku.component";
import {AddUserComponent} from "./Users/add-user/add-user.component";
import {EditUserComponent} from "./Users/edit-user/edit-user.component";
import {ListUserComponent} from "./Users/list-user/list-user.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'add-discount', component: AddDiscountComponent },
  { path: 'edit-discount', component: EditDiscountComponent },
  { path: 'list-discount', component: ListDiscountComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'edit-order', component: EditOrderComponent },
  { path: 'list-order', component: ListOrderComponent },
  { path: 'add-rep', component: AddRepComponent },
  { path: 'edit-rep', component: EditRepComponent },
  { path: 'list-rep', component: ListRepComponent },
  { path: 'add-sku', component: AddSkuComponent },
  { path: 'edit-sku', component: EditSkuComponent },
  { path: 'list-sku', component: ListSkuComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
