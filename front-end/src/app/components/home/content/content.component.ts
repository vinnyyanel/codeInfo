import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { PostListComponent } from "../../posts/post-list/post-list.component";
import { NgIf } from '@angular/common';
import { PostAddComponent } from '../../posts/post-add/post-add.component';
import { AuthService } from '../../../services/auth.service';
import { SearchComponent } from '../../posts/search/search.component';


@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  imports: [
    MatIconModule,
    PostListComponent,
    SearchComponent,
    PostAddComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  private authService = inject(AuthService);
  isLog = false;
  constructor(){
     this.isLog = this.authService.islogin();
  }

}
