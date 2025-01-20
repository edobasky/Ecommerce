import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer, LoginModel } from './model/Customer';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { APIResponseModel } from './model/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'ecommerce';
  registerObj : Customer = new Customer();
  loginObj : LoginModel = new LoginModel();
  loggedUserData  : Customer = new Customer();
  masterService = inject(MasterService);

  @ViewChild("registerModel") registerModel : ElementRef | undefined;
  @ViewChild("loginModel") loginModel : ElementRef | undefined;

  ngOnInit(): void {
    const isUser = localStorage.getItem('ecom18');

    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }

  openRegisterModal() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "block" ;
    } 

  }

  closeRegisterModal() {
    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = "none" ;
    } 
  }

  openLoginModal() {
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = "block" ;
    } 

  }

  closeLoginModal() {
    if (this.loginModel) {
      this.loginModel.nativeElement.style.display = "none" ;
    } 
  }

  onRegister() {
      this.masterService.registerNewCustomer(this.registerObj).subscribe((res : APIResponseModel) => {
        if (res.result) {
          alert("Registration Success")
          this.closeRegisterModal();
        }else {
          alert(res.message);
        }
      });
  }

  onLogin() {
    this.masterService.onLogin(this.loginObj).subscribe((res : APIResponseModel) => {
      if (res.result) {
        this.loggedUserData = res.data;
        localStorage.setItem('ecom18', JSON.stringify(res.data))
        this.closeLoginModal();
      }else {
        alert(res.message);
      }
    });
  }

  LogOff() {
    localStorage.removeItem("ecom18");
    this.loggedUserData = new Customer();
  }
}
