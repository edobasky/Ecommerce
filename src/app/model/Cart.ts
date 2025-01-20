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