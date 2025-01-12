import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { PostListComponent } from "../../posts/post-list/post-list.component";
import { NgIf } from '@angular/common';
import { PostAddComponent } from '../../posts/post-add/post-add.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  imports: [
    MatIconModule,
    PostListComponent,
    NgIf,
    PostAddComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  private authService = inject(AuthService);
  isLog = false;
  constructor(){
   if (localStorage.getItem(this.authService.tokenKey)) {
     this.isLog = true;
   }
  }

}
