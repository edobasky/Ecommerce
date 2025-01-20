export class Customer {
  custId: number
  name: string
  MobileNo: string
  Password: string

  constructor() {
    this.custId = 0;
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
