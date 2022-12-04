import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user: any;
  constructor(private http: HttpClient) {}
  public cretenewuser(dataobj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users', dataobj).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  public loginuser(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users?email=' + email).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
