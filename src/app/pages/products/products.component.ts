import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { APIResponseModel, Category, ProductList } from '../../model/product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Customer } from '../../model/Customer';
import { Cart } from '../../model/Cart';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // productList : ProductList [] = []; old way
  productList = signal<ProductList[]>([]);  // new way Angular 16 >

  categoryList$: Observable<Category[]> = new Observable<Category[]>();
  subscriptionList: Subscription[] = [];
  //loggedUserData : Customer = new Customer();

  masterService = inject(MasterService)

  constructor() {
   //this.loggedUserData = this.masterService.loggedUserData;
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  getProductByCategoryId(id : number) {
    this.masterService.getAllProductsByCategoryId(id).subscribe((res:APIResponseModel) => {
      this.productList.set(res.data);
    })
  }

  loadAllProducts() {
    this.subscriptionList.push( this.masterService.getAllProducts().subscribe((res:APIResponseModel) => {
      //  this.productList = res.data old way
       this.productList.set(res.data)
    }));
  }

  onAddToCart(id: number) {
    const newObj : Cart = new Cart();
    newObj.ProductId = id;
    newObj.custId = this.masterService.loggedUserData.custId;
    this.masterService.addToCart(newObj).subscribe((res:APIResponseModel)=> {
      if (res.result) {
        alert("Product added to cart")
        this.masterService.onCartAdded.next(true);
      }else {
        alert(res.message)
      }
    });
  }

  ngOnDestroy(): void {
      this.subscriptionList.forEach(element => {
        element.unsubscribe();
      });
  }

}
