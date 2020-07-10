import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpsService } from 'src/app/sevice/https.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  likeActive: boolean = false;

  constructor(private http: HttpsService) { }

  ngOnInit() {
  }

  like(){
    this.post.likeActive = !this.post.likeActive;
    if(this.post.likeActive == true) this.post.countLike++;
    else this.post.countLike--;
    this.http.updatePost(this.post);
  }

}
