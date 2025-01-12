import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostService } from '../../../services/posts/post.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgInputValidationComponent } from 'ng-input-validation';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-add',
  standalone: true,
  imports: [
    FormsModule,
    EditorModule,
    NgIf
  ],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.css'
})
export class PostAddComponent {

  config = {
    apiKey: 'wcatzhst66wftc3os4ouaxm21cl3tw56qczpbdnrxdum517n'
  };
  titre:any;
  description:any;
  isLoading:boolean = false;
  message:any ;

  constructor( private postService:PostService, private authService:AuthService, private cdr:ChangeDetectorRef) {}

  onSubmit(){
    this.isLoading = true;
    const data = {
      titre: this.titre,
      description: this.description,
      user_id: this.authService.getUser().id,
    }
    console.log(data);
   this.postService.postUserPost(data).subscribe({
          next:res=>{
            console.log(res.message);
            this.isLoading = false;
            this.message = res.message;
            this.titre="";
            this.description="";
            this.cdr.detectChanges();
          },error:error=>{
            console.log(error.message);

             error.message;
          }
        });
  }
}
