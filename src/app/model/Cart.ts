export class Cart {
  CartId: number
  custId: number
  ProductId: number
  Quantity: number
  AddedDate: string

  constructor() {
    this.CartId = 0;
    this.custId = 0;
    this.ProductId = 0;
    this.Quantity = 1;
    this.AddedDate = new Date().toISOString()

  }
}

export interface CartData {
  cartId: number
  custId: number
  productId: number
  quantity: number
  productShortName: string
  addedDate: string
  productName: string
  categoryName: string
  productImageUrl: string
  productPrice: number
}