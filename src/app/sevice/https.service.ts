import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  menuCollection: AngularFirestoreCollection<Menu>;
  menu: Observable<Menu[]>;
  menuDoc: AngularFirestoreDocument<Menu>;

  posts: Observable<any>
  postCollection: AngularFirestoreCollection<Post>;

  comments: Observable<any>
  commentCollection: AngularFirestoreCollection<Comment>;

  constructor(private http: HttpClient, 
              public afs: AngularFirestore
  ) {
    this.menu = this.afs.collection('menu').valueChanges();
    this.posts = this.afs.collection('posts').valueChanges();
  }

  getMenu(){
    return this.menu;
  }
  
  getPost(){
    return this.posts;
  }

  getComment(id: string){
    this.comments = this.afs.collection('posts').doc(id).collection('comment').valueChanges();
    return this.comments;
  }

  update(menu: Menu){
    this.menuDoc = this.afs.doc(`menu/${menu.id}`);
    this.menuDoc.update(menu);
  }

  postComment(id: string, cmt: Comment){
    this.afs.collection('posts').doc(id).collection('comment').add({...cmt});
  }
}

