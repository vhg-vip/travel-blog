import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { AboutComponent } from './view/about/about.component';
import { PostComponent } from './view/post/post.component';
import { UploadComponent } from './view/upload/upload.component';
import { DetailPostComponent } from './view/detail-post/detail-post.component';
import { CommentComponent } from './view/comment/comment.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PostComponent,
    UploadComponent,
    DetailPostComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'travel-app'),
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
