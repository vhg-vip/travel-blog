import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { HttpsService } from 'src/app/sevice/https.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() postID: string;

  likeActive: boolean = false;
  editText: string;
  openEditBox: boolean = false;
  PostId = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  deleteComment(event, cmt){
    this.http.deleteComment(cmt, this.postID);
    console.log(cmt);
  }

  like(cmt: Comment){
    this.comment.likeActive = !this.comment.likeActive;
    if(this.comment.likeActive == true) this.comment.like++;
    else this.comment.like--;
    this.http.updateComment(cmt, this.PostId);
  }

  openEdit(){
    this.openEditBox = !this.openEditBox;
  }

  isEdit(){
    this.comment.isEdit = true;
    this.openEditBox = false;
    this.editText = this.comment.text;
  }

  updateComment(cmt: Comment){
    this.comment.isEdit = false;
    this.comment.text = this.editText;
    this.http.updateComment(cmt, this.PostId);
  }

  cancelEdit(){
    this.comment.isEdit = false;
  }

}
