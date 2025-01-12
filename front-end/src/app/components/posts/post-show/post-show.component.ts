import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostService } from '../../../services/posts/post.service';
import { CommentService } from '../../../services/comments/comment.service';
import { User } from '../../../models/users/user';
import { UserService } from '../../../services/users/user.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../../home/header/header.component";
import { FooterComponent } from "../../home/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommentAddComponent } from "../../comments/comment-add/comment-add.component";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-show',
  standalone: true,
  imports: [
    NgFor,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    DatePipe,
    CommentAddComponent,
    NgIf
],
  templateUrl: './post-show.component.html',
  styleUrl: './post-show.component.css'
})
export class PostShowComponent {

  config = {
    apiKey: 'wcatzhst66wftc3os4ouaxm21cl3tw56qczpbdnrxdum517n'
  };
  post: any = [];
  comments: any[] =[];
  newComment: string = '';
  postId: any;
  isLoading:boolean = true;
  isLoading2:boolean = true;

  constructor(private route: ActivatedRoute,private postService: PostService, private cdf:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPostDetails();
    this.getComments();
  }

  conv(comment:any){
    this.getComments();
  }

  getPostDetails(): void {
    this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  getComments():void{
    this.postService.getCommentPostById(this.postId).subscribe(comments => {
      console.log(comments);
      this.comments = comments;
      this.isLoading2 = this.isLoading = false;
      this.cdf.detectChanges();
    });

  }
}
