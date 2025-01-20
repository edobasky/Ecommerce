export class Customer {
  CustId: number
  name: string
  MobileNo: string
  Password: string

  constructor() {
    this.CustId = 0;
    this.name = '';
    this.MobileNo = '';
    this.Password = '';
  }
}

export class LoginModel {
  UserName: string
  UserPassword: string

  constructor() {
    this.UserName = '';
    this.UserPassword = '';
  }

}
