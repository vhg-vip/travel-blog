import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpsService } from 'src/app/sevice/https.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  post: Post=new Post();
  likeActive: boolean = false;
  cmt: string;
  commentPost: Comment = new Comment();
  id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpsService, private route: ActivatedRoute) {
    this.getPostDetail();
    this.getComment();
  }

  ngOnInit(): void {
    
  }

  sendComment(){
    this.commentPost.text = this.cmt;
    console.log(this.commentPost);
    this.http.postComment(this.id, this.commentPost);
    this.cmt = '';
  }

  getComment(){
    
    this.http.getComment(this.id).subscribe(data => {
      this.post.comments = data;
      console.log(this.post.comments);
    });
  }

  getPostDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    this.http.getPost().subscribe(data => {
      this.post = data.find(post => post.id == id);
      // console.log(this.post);
    });
  }

  like(){
    this.likeActive = !this.likeActive;
    if(this.likeActive == true) this.post.countLike++;
    else this.post.countLike--;
  }

}
