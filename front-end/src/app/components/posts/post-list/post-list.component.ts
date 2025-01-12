import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, DoCheck, Input, Output, SimpleChanges } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { RouterLink } from '@angular/router';
import { Console, error } from 'console';
import { ContentListComponent } from './content-list/content-list.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    ContentListComponent,
    NgIf
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  posts: any[] = [];
  currentPage: number = 1;
  lastPage: number = 1;
  tet: number = 0;
  isLoading:boolean = false;

  constructor(private postService: PostService, private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.loadPosts(this.currentPage);
  }


  loadPosts(page: number) {
    this.isLoading = true;  // Indiquer que le chargement commence
    this.tet++;
    console.log(this.tet);

    console.log(this.isLoading);
    this.postService.getPosts(page).subscribe({
      next: (response) => {
        this.posts = response.data; // Les posts
        console.log(this.posts);
        this.currentPage = response.current_page; // Page actuelle
        this.lastPage = response.last_page; // Dernière page
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;  // En cas d'erreur, aussi réinitialiser le chargement
      }
    });
  }

  changePage(action: string | number) {
    if (action === 'prev' && this.currentPage > 1) {
      this.isLoading = false;
      this.loadPosts(this.currentPage - 1);
    } else if (action === 'next' && this.currentPage < this.lastPage) {
      this.isLoading = false;
      console.log("next");
      this.loadPosts(this.currentPage + 1);
    } else if (typeof action === 'number') {
      this.isLoading = false;
      this.loadPosts(action);
    }
  }
}
