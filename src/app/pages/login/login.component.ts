import { UsersService } from './../../service/user.service';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    public UsersService: UsersService,
    private snackabar: MatSnackBar,
    private router: Router
  ) {}
  loginFrom = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    return this.UsersService.loginuser(this.loginFrom.value.email!)
      .then((res: any) => {
        console.log(res);
        if (res.length == 0) {
          this.snackabar.open(`account doesn't exist.`, 'ok');
          //console.log("account doesn't exist.")
        } else {
          if (res[0].password == this.loginFrom.value.password) {
            this.snackabar.open('matched', 'ok');
            this.UsersService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            this.snackabar.open('password not matched', 'ok');
            //console.log("password not matched")
          }
        }
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
