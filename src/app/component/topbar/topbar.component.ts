import { UsersService } from './../../service/user.service';

import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  constructor(private router: Router, private service: UsersService) {}

  logout() {
    this.service.user = undefined;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
