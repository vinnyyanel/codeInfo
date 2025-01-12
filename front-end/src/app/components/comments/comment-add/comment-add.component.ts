import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from '../../../services/comments/comment.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment-add',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule
  ],
  templateUrl: './comment-add.component.html',
  styleUrl: './comment-add.component.css'
})
export class CommentAddComponent {
  @Input() post_id :string = "" ;
  @Output() signal = new EventEmitter<any>();
   comment:any;
   isLoading:boolean=false;

  emmit(comment:any){
    this.signal.emit(comment);
  }
 config = {
    apiKey: 'wcatzhst66wftc3os4ouaxm21cl3tw56qczpbdnrxdum517n'
  };


  constructor(private commentService: CommentService, protected authService:AuthService, private cdf:ChangeDetectorRef) {

  }
  addComment(){
    this.isLoading = true;
    const data = {
      comment: this.comment,
      user_id: this.authService.getUser().id,
      post_id:this.post_id,
      statut:"ok"
    }
    this.commentService.postComment(data).subscribe({
      next:(res)=>{
       this.comment = "";
        this.isLoading = false;
       this.emmit(data);
       this.cdf.detectChanges();

      }
    });
  }
 //
}
