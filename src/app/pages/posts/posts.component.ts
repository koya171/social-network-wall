import { PostsService } from './../../service/post.service';
import { UsersService } from './../../service/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    public UsersService: UsersService,
    private router: Router,
    private storage: AngularFireStorage,
    private ps: PostsService
  ) {}
  ngOnInit(): void {
    if (this.UsersService.user == undefined || this.UsersService.user == null) {
      var str = localStorage.getItem('user');
      if (str != null) {
        this.UsersService.user = JSON.parse(str);
        this.router.navigate(['/posts']);
      } else {
        this.router.navigate(['/login']);
      }
    }
    this.ps
      .getPosts()
      .then((res: any) => {
        console.log(res);
        this.posts = res;

        for (let post of this.posts) {
          post.comment.push('');
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  selectedfile: any;
  text: string = '';
  posts: Array<any> = [];
  commentText: Array<any> = [];
  onPreselected(event: any) {
    this.selectedfile = event.target.files[0];
  }
  post() {
    if (this.selectedfile != undefined || this.selectedfile != null) {
      this.uploadImage()
        .then((imageurl) => {
          console.log(imageurl);

          let postobj = {
            userName: this.UsersService.user.username,
            text: this.text,
            imageURL: imageurl,
            likes: [],
            comments: [],
          };
          this.posts.push(postobj);
          this.ps
            .postusers(postobj)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
            });
          this.selectedfile = undefined;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let objpost = {
        userName: this.UsersService.user.userName,
        text: this.text,
        imageUrl: '',
        like: [],
        comments: [],
      };
      this.posts.push(objpost);
      this.ps
        .postusers(objpost)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
  uploadImage() {
    return new Promise((reslove, reject) => {
      let n = Date.now();
      const file = this.selectedfile;
      const filepath = `images/${n}`;
      const fileRef = this.storage.ref(filepath);
      const task = this.storage.upload(`images/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageURL = fileRef.getDownloadURL();
            imageURL.subscribe((url: any) => {
              if (url) {
                console.log(url);
                reslove(url);
              }
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    });
  }

  like(postid: number) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postid) {
        if (this.posts[i].likes.indexOf(this.UsersService.user.id) >= 0) {
          this.posts[i].likes.splice(
            this.posts[i].likes.indexOf(this.UsersService.user.id),
            1
          );
        } else {
          this.posts[i].likes.push(this.UsersService.user.id);
        }
        this.ps
          .like(this.posts[i])
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  }
  comment(postId: any, postindex: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        let commentobj = {
          userName: this.UsersService.user.userName,
          comment: this.commentText[postindex],
        };
        this.posts[i].comments.push(commentobj);
        this.commentText[postindex] = '';
        this.ps
          .updatecomments(this.posts[i])
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  }

  postschema = {
    userName: '',
    imageURL: '',
    text: '',
    likes: [],
    comments: [
      {
        userName: '',
        comment: '',
      },
    ],
  };
}
