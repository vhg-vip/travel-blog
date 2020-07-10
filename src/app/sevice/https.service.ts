import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  menuCollection: AngularFirestoreCollection<Menu>;
  menu: Observable<Menu[]>;
  menuDoc: AngularFirestoreDocument<Menu>;

  posts: Observable<Post[]>;
  postCollection: AngularFirestoreCollection<Post>;

  comments: Observable<Comment[]>;
  commentCollection: AngularFirestoreCollection<Comment>;
  commentDoc: AngularFirestoreDocument<Comment>;

  constructor(private http: HttpClient, 
              public afs: AngularFirestore
  ) {
    
  }

  getMenu(){
    this.menu = this.afs.collection('menu').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Menu;
        data.id = a.payload.doc.id;
        return data
      })
    }))
    return this.menu;
  }
  
  getPost(){
    this.posts = this.afs.collection('posts').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
    return this.posts;
  }

  updatePost(post: Post){
    this.afs.doc(`posts/${post.id}`).update(post);
  }

  getComment(id: string){
    this.comments = this.afs.collection('posts').doc(id).collection('comment').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Comment;
        data.id = a.payload.doc.id;
        // console.log(data);
        return data;
      })
    }))
    return this.comments;
  }

  postComment(id: string, cmt: Comment){
    this.afs.collection('posts').doc(id).collection('comment').add({...cmt});
  }

  deleteComment(cmt: Comment, PostId: string){
    this.commentDoc = this.afs.doc(`posts/${PostId}/comment/${cmt.id}`);
    this.commentDoc.delete();
  }

  updateComment(cmt: Comment, PostId: string){
    this.commentDoc = this.afs.doc(`posts/${PostId}/comment/${cmt.id}`);
    this.commentDoc.update(cmt);
  }
}

