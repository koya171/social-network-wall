import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  postusers(objpost: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/posts', objpost).subscribe(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/posts').subscribe(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  like(postobj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/posts/' + postobj.id, postobj)
        .subscribe(
          (res) => {
            resolve(res);
            console.log(res);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
  updatecomments(postobj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/posts/' + postobj.id, postobj)
        .subscribe(
          (res) => {
            resolve(res);
            console.log(res);
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
