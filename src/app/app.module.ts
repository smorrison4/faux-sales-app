import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './Users/login/login.component';
import { routing} from "./app.routing";
import { AuthenticationService} from "./service/auth.service";
import { ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AddCustomerComponent } from "./Customers/add-customer/add-customer.component";
import { EditCustomerComponent } from "./Customers/edit-customer/edit-customer.component";
import { ListCustomerComponent} from "./Customers/list-customer/list-customer.component";
import { AddDiscountComponent } from "./Discounts/add-discount/add-discount.component";
import { EditDiscountComponent } from "./Discounts/edit-discount/edit-discount.component";
import { ListDiscountComponent} from "./Discounts/list-discount/list-discount.component";
import { AddOrderComponent } from "./Orders/add-order/add-order.component";
import { EditOrderComponent } from "./Orders/edit-order/edit-order.component";
import { ListOrderComponent} from "./Orders/list-order/list-order.component";
import { AddRepComponent } from "./Reps/add-rep/add-rep.component";
import { EditRepComponent } from "./Reps/edit-rep/edit-rep.component";
import { ListRepComponent} from "./Reps/list-rep/list-rep.component";
import { AddSkuComponent } from "./Skus/add-sku/add-sku.component";
import { EditSkuComponent } from "./Skus/edit-sku/edit-sku.component";
import { ListSkuComponent} from "./Skus/list-sku/list-sku.component";
import { AddUserComponent } from './Users/add-user/add-user.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { ListUserComponent} from "./Users/list-user/list-user.component";
import { CustomerService} from "./service/customer.service";
import { DiscountService } from './service/discount.service';
import { OrderService} from "./service/order.service";
import { RepService} from "./service/rep.service";
import { SkuService} from "./service/sku.service";
import { UserService} from "./service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ListCustomerComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    ListDiscountComponent,
    AddOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
    AddRepComponent,
    EditRepComponent,
    ListRepComponent,
    AddSkuComponent,
    EditSkuComponent,
    ListSkuComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,
    CustomerService, 
    DiscountService, 
    OrderService, 
    RepService,
    SkuService,
    UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
