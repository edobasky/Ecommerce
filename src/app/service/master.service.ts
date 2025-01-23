import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResponseModel } from '../model/product';
import { Customer, LoginModel } from '../model/Customer';
import { Cart } from '../model/Cart';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';
onCartAdded: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "GetAllProducts");
  }

  getAllCategory() : Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "GetAllCategory");
  }

  getAllProductsByCategoryId(CategoryId : number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${CategoryId}`;
    return this.http.get<APIResponseModel>(url)
  }

  
  registerNewCustomer(obj : Customer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<APIResponseModel>(url,obj)
  }

  onLogin(obj : LoginModel): Observable<APIResponseModel> {
    const url = `${this.apiUrl}Login`;
    return this.http.post<APIResponseModel>(url,obj)
  }

  addToCart(obj: Cart): Observable<APIResponseModel> {
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<APIResponseModel>(url,obj)
  }
  
  // GetCartProductsByCustomerId?id=2177
  getCartProductsByCustomerId(loggedUserId : number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    return this.http.get<APIResponseModel>(url)
  }

  deleteProductFromCartById(loggedUserId : number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${loggedUserId}`;
    return this.http.get<APIResponseModel>(url)
  }

  // DeleteProductFromCartById?id=1
}
