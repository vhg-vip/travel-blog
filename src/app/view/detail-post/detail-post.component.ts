import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpsService } from 'src/app/sevice/https.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators"

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
  imgUrl = "";
  selectedImage: any ;

  constructor(private http: HttpsService, 
              private route: ActivatedRoute,
              private storage: AngularFireStorage
    ) {
    this.getPostDetail();
    this.getComment();
  }

  ngOnInit(): void {
    this.reset();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgUrl = e.target.result; 
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    }
    else{
      this.imgUrl = "";
      this.selectedImage = null;
    }
  }

  reset(){
    this.cmt = '';
    this.imgUrl = '';
    this.selectedImage = null;
  }

  uploadImage(){
    let filePath = `image/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url) => {
          this.commentPost.image = url;
          this.commentPost.text = this.cmt;
          this.http.postComment(this.id, this.commentPost);
          this.reset();
          console.log(this.commentPost);
        })
      })
    ).subscribe();
    
  }

  sendComment(){
    if(this.imgUrl){
      this.uploadImage();
    }
    else{
      this.commentPost.text = this.cmt;
      this.http.postComment(this.id, this.commentPost);
      this.reset();
    }
    
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
    this.post.likeActive = !this.post.likeActive;
    if(this.post.likeActive == true) this.post.countLike++;
    else this.post.countLike--;
    this.http.updatePost(this.post);
  }

}
