import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  menuCollection: AngularFirestoreCollection<Menu>;
  menu: Observable<Menu[]>;
  menuDoc: AngularFirestoreDocument<Menu>;

  constructor(private http: HttpClient, 
              public afs: AngularFirestore
  ) {
    this.menu = this.afs.collection('menu').valueChanges();
  }

  get(){
    return this.menu;
  }

  update(menu: Menu){
    this.menuDoc = this.afs.doc(`menu/${menu.id}`);
    this.menuDoc.update(menu);
  }
}

