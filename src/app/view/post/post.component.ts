import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  likeActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  like(){
    this.likeActive = !this.likeActive;
    if(this.likeActive == true) this.post.countLike++;
    else this.post.countLike--;
  }

}
