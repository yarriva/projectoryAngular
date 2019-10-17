import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})

export class LoginformComponent {
  passwordInputType = "password";
  isPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  togglePassword() {
    this.isPassword === true ? this.passwordInputType = "password" : this.passwordInputType = "text";
    this.isPassword = !this.isPassword;
  }

  loginUser(credentials: { userEmail: string; userPassword: string; }) {
    this.authService.loginUser(credentials)
      .subscribe(result => {
        if (result)
          this.router.navigate(['dashboard']);
        else
          console.log('wrong password or email');
      });
  }
}
