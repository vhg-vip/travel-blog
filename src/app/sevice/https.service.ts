import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  menuCollection: AngularFirestoreCollection<Menu>;
  menu: Observable<Menu[]>;
  menuDoc: AngularFirestoreDocument<Menu>;

  posts: Observable<any>
  postCollection: AngularFirestoreCollection<Post>;

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

  update(menu: Menu){
    this.menuDoc = this.afs.doc(`menu/${menu.id}`);
    this.menuDoc.update(menu);
  }
}

