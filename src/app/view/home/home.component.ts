import { Component, OnInit } from '@angular/core';
import { HttpsService } from 'src/app/sevice/https.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(private http: HttpsService) { 
    this.getPost();
  }

  ngOnInit(): void {
  }

  getPost(){
    this.http.getPost().subscribe(data => {
      this.posts = data;
      // console.log(data);
    })
  }

}
