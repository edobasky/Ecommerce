import { Component, inject, OnInit } from '@angular/core';
import { CartData } from '../../model/Cart';
import { MasterService } from '../../service/master.service';
import { APIResponseModel, OrderModel } from '../../model/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
  
  masterService = inject(MasterService)
  cartData : CartData [] = [];
  totalAmount : number = 0;
  orderObj : OrderModel = new OrderModel();

  ngOnInit(): void {
    
    this.getCartItems()
  }

   getCartItems() {
      this.masterService.getCartProductsByCustomerId(this.masterService.loggedUserData.custId).subscribe((res: APIResponseModel) => {
         this.cartData = res.data;
         this.cartData.forEach(element => {
              this.totalAmount += element.productPrice
         });
      })
    }

    placeOrder() {
      this.orderObj.CustId = this.masterService.loggedUserData.custId;
      this.orderObj.TotalInvoiceAmount = this.totalAmount;
      this.masterService.onPlaceOrder(this.orderObj).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("Order placed successfully")
          this.getCartItems();
          this.orderObj = new OrderModel();
          this.totalAmount = 0;
        } else {
            alert(res.message);
        }
      })
    }
}
